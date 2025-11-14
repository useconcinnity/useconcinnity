import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { MessageService } from './message.service';

@Module({
  providers: [ChatGateway, ChatService, MessageService],
  exports: [ChatService, MessageService],
})
export class ChatModule {}

