import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

export interface DyteMeeting {
  id: string;
  title: string;
  roomName: string;
  status: 'LIVE' | 'ENDED';
  createdAt: string;
}

export interface DyteParticipant {
  id: string;
  name: string;
  picture?: string;
  preset_name: string;
  custom_participant_id?: string;
}

export interface DyteAuthToken {
  token: string;
}

@Injectable()
export class DyteService {
  private readonly logger = new Logger(DyteService.name);
  private readonly client: AxiosInstance;
  private readonly orgId: string;
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.orgId = this.configService.get<string>('DYTE_ORG_ID');
    this.apiKey = this.configService.get<string>('DYTE_API_KEY');

    if (!this.orgId || !this.apiKey) {
      this.logger.warn('Dyte credentials not configured');
    }

    this.client = axios.create({
      baseURL: 'https://api.dyte.io/v2',
      headers: {
        'Authorization': `APIKEY ${this.orgId}:${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Create a new Dyte meeting
   */
  async createMeeting(title: string, recordOnStart = false): Promise<DyteMeeting> {
    try {
      const response = await this.client.post('/meetings', {
        title,
        preferred_region: 'us-east-1',
        record_on_start: recordOnStart,
        live_stream_on_start: false,
      });

      this.logger.log(`Created Dyte meeting: ${response.data.data.id}`);
      return response.data.data;
    } catch (error) {
      this.logger.error('Failed to create Dyte meeting', error);
      throw error;
    }
  }

  /**
   * Add a participant to a meeting
   */
  async addParticipant(
    meetingId: string,
    name: string,
    preset: string = 'group_call_host',
    customParticipantId?: string,
    picture?: string,
  ): Promise<DyteAuthToken> {
    try {
      const response = await this.client.post(`/meetings/${meetingId}/participants`, {
        name,
        preset_name: preset,
        custom_participant_id: customParticipantId,
        picture,
      });

      this.logger.log(`Added participant to meeting ${meetingId}: ${name}`);
      return response.data.data;
    } catch (error) {
      this.logger.error('Failed to add participant to Dyte meeting', error);
      throw error;
    }
  }

  /**
   * Get meeting details
   */
  async getMeeting(meetingId: string): Promise<DyteMeeting> {
    try {
      const response = await this.client.get(`/meetings/${meetingId}`);
      return response.data.data;
    } catch (error) {
      this.logger.error('Failed to get Dyte meeting', error);
      throw error;
    }
  }

  /**
   * Get all participants in a meeting
   */
  async getParticipants(meetingId: string): Promise<DyteParticipant[]> {
    try {
      const response = await this.client.get(`/meetings/${meetingId}/participants`);
      return response.data.data;
    } catch (error) {
      this.logger.error('Failed to get Dyte meeting participants', error);
      throw error;
    }
  }

  /**
   * End a meeting
   */
  async endMeeting(meetingId: string): Promise<void> {
    try {
      await this.client.post(`/meetings/${meetingId}/active-session`, {
        action: 'end',
      });
      this.logger.log(`Ended Dyte meeting: ${meetingId}`);
    } catch (error) {
      this.logger.error('Failed to end Dyte meeting', error);
      throw error;
    }
  }
}

