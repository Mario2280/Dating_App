import { Module } from '@nestjs/common';
import { UserGalleryService } from './user_gallery.service';
import { UserGalleryController } from './user_gallery.controller';
import { PrismaService } from '@services/prisma.service';

@Module({
  imports: [],
  controllers: [UserGalleryController],
  providers: [UserGalleryService, PrismaService],
  exports: [UserGalleryService],
})
export class UserGalleryModule {}
