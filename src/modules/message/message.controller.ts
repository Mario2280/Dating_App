// src/message/message.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageCreateDto, MessageSendDto } from '@validation/message';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('create')
  async createDBRecord(@Body() createMessageDto: MessageCreateDto) {
    return await this.messageService.create(createMessageDto);
  }

  @Post('send')
  send(@Body() msg: MessageSendDto) {
    return this.messageService.send(msg);
  }
}
