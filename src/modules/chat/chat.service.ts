import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
//import { NotificationService } from '../notification/notification.service';
import { ChatCreateDto, ChatDeleteDto } from '@validation/chat';
import { MediaService } from '@modules/media/media.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mediaService: MediaService,
    //private readonly notificationService: NotificationService,
  ) {}

  async create(chatDto: ChatCreateDto) {
    try {
      await this.prisma.chat.create({
        data: {
          user1_id: BigInt(chatDto.user1_id),
          user2_id: BigInt(chatDto.user2_id),
          last_message_at: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to create chat:', error);
      throw error;
    }
  }

  async delete(chatDto: ChatDeleteDto) {
    try {
      const medias = await this.prisma.media.findMany({
        where: {
          message: {
            chat_id: chatDto.id,
          },
        },
      });
      for (const el of medias) {
        await this.mediaService.delete(el.id);
      }
      await this.prisma.media.deleteMany({
        where: {
          message: {
            chat_id: chatDto.id,
          },
        },
      });
      await this.prisma.chat.delete({
        where: {
          id: chatDto.id,
        },
      });
    } catch (error) {
      console.error('Chat deleting error:', error);
      throw error;
    }
  }

  async getAllChats(userId: string) {
    try {
      const chats = await this.prisma.chat.findMany({
        where: {
          OR: [{ user1_id: BigInt(userId) }, { user2_id: BigInt(userId) }],
        },
        include: {
          message: true,
        },
      });
      return chats;
    } catch (error) {
      console.error('Failed to fetch unread messages:', error);
      throw error;
    }
  }
}
