import { MediaController } from './media.controller';

import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { PrismaService } from '../../services/prisma.service';
import { UploaderModule } from '@modules/uploader/uploader.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, UploaderModule],
  controllers: [MediaController],
  providers: [MediaController, MediaService, PrismaService],
  exports: [PrismaService, MediaService],
})
export class MediaModule {}
