import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatCreateDto, ChatDeleteDto } from '@validation/chat';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  async create(@Body() chatDto: ChatCreateDto) {
    await this.chatService.create(chatDto);
    return { status: 'Chat created' };
  }

  @Post('delete')
  async delete(@Body() chatDto: ChatDeleteDto) {
    await this.chatService.delete(chatDto);
    return { status: 'Chat deleted' };
  }

  @Get('getAll')
  async getChats(@Query('userId') userId: string) {
    return await this.chatService.getAllChats(userId);
  }
}
