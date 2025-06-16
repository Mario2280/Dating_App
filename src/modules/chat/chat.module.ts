import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
//import { NotificationService } from '../notification/notification.service';
import { MediaModule } from '@modules/media/media.module';
import { PrismaService } from '@services/prisma.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [MediaModule],
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatGateway,
    PrismaService,
    //NotificationService,
  ],
  exports: [ChatService],
})
export class ChatModule {}
