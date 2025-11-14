import { Injectable, Logger } from '@nestjs/common';

interface UserPresence {
  userId: string;
  socketId: string;
  channelId: string;
  connectedAt: Date;
}

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private userPresence: Map<string, UserPresence> = new Map();

  /**
   * Add user to channel presence
   */
  async addUserToChannel(
    channelId: string,
    userId: string,
    socketId: string,
  ): Promise<void> {
    const key = `${channelId}:${userId}`;
    this.userPresence.set(key, {
      userId,
      socketId,
      channelId,
      connectedAt: new Date(),
    });

    this.logger.log(`User ${userId} added to channel ${channelId}`);
  }

  /**
   * Remove user from channel presence
   */
  async removeUserFromChannel(
    channelId: string,
    userId: string,
  ): Promise<void> {
    const key = `${channelId}:${userId}`;
    this.userPresence.delete(key);

    this.logger.log(`User ${userId} removed from channel ${channelId}`);
  }

  /**
   * Handle user disconnect (remove from all channels)
   */
  handleUserDisconnect(socketId: string): void {
    const toRemove: string[] = [];

    this.userPresence.forEach((presence, key) => {
      if (presence.socketId === socketId) {
        toRemove.push(key);
      }
    });

    toRemove.forEach((key) => {
      this.userPresence.delete(key);
      this.logger.log(`Removed disconnected user: ${key}`);
    });
  }

  /**
   * Get users in a channel
   */
  getUsersInChannel(channelId: string): UserPresence[] {
    const users: UserPresence[] = [];

    this.userPresence.forEach((presence) => {
      if (presence.channelId === channelId) {
        users.push(presence);
      }
    });

    return users;
  }

  /**
   * Check if user is in channel
   */
  isUserInChannel(channelId: string, userId: string): boolean {
    const key = `${channelId}:${userId}`;
    return this.userPresence.has(key);
  }
}

