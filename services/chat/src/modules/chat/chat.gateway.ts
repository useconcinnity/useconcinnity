import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { MessageService } from './message.service';

interface JoinChannelDto {
  channelId: string;
  userId: string;
}

interface SendMessageDto {
  channelId: string;
  userId: string;
  content: string;
}

interface TypingDto {
  channelId: string;
  userId: string;
  userName: string;
}

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private chatService: ChatService,
    private messageService: MessageService,
  ) {}

  /**
   * Handle client connection
   */
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  /**
   * Handle client disconnection
   */
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    // Clean up user presence
    this.chatService.handleUserDisconnect(client.id);
  }

  /**
   * Join a channel
   */
  @SubscribeMessage('join_channel')
  async handleJoinChannel(
    @MessageBody() data: JoinChannelDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { channelId, userId } = data;

    // Join the Socket.io room
    client.join(`channel:${channelId}`);

    // Track user presence
    await this.chatService.addUserToChannel(channelId, userId, client.id);

    // Notify others in the channel
    client.to(`channel:${channelId}`).emit('user_joined', {
      channelId,
      userId,
      timestamp: new Date().toISOString(),
    });

    this.logger.log(`User ${userId} joined channel ${channelId}`);

    return { success: true, channelId };
  }

  /**
   * Leave a channel
   */
  @SubscribeMessage('leave_channel')
  async handleLeaveChannel(
    @MessageBody() data: JoinChannelDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { channelId, userId } = data;

    // Leave the Socket.io room
    client.leave(`channel:${channelId}`);

    // Remove user presence
    await this.chatService.removeUserFromChannel(channelId, userId);

    // Notify others in the channel
    client.to(`channel:${channelId}`).emit('user_left', {
      channelId,
      userId,
      timestamp: new Date().toISOString(),
    });

    this.logger.log(`User ${userId} left channel ${channelId}`);

    return { success: true, channelId };
  }

  /**
   * Send a message
   */
  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() data: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { channelId, userId, content } = data;

    try {
      // Save message to database
      const message = await this.messageService.createMessage({
        channelId,
        userId,
        content,
      });

      // Broadcast to all users in the channel (including sender)
      this.server.to(`channel:${channelId}`).emit('new_message', {
        id: message.id,
        channelId: message.channelId,
        userId: message.userId,
        content: message.content,
        createdAt: message.createdAt,
        user: message.user,
      });

      this.logger.log(`Message sent in channel ${channelId} by user ${userId}`);

      return { success: true, messageId: message.id };
    } catch (error) {
      this.logger.error('Error sending message', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Handle typing indicator
   */
  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: TypingDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { channelId, userId, userName } = data;

    // Broadcast to others in the channel (not sender)
    client.to(`channel:${channelId}`).emit('user_typing', {
      channelId,
      userId,
      userName,
      timestamp: new Date().toISOString(),
    });

    return { success: true };
  }

  /**
   * Handle stop typing indicator
   */
  @SubscribeMessage('stop_typing')
  handleStopTyping(
    @MessageBody() data: TypingDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { channelId, userId } = data;

    // Broadcast to others in the channel (not sender)
    client.to(`channel:${channelId}`).emit('user_stop_typing', {
      channelId,
      userId,
      timestamp: new Date().toISOString(),
    });

    return { success: true };
  }
}

