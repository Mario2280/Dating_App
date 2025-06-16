import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import {
  UserGalleryCreateDto,
  UserGalleryDeleteDto,
} from '@validation/user_gallery';

@Injectable()
export class UserGalleryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserGalleryDto: UserGalleryCreateDto) {
    return this.prisma.user_gallery.create({
      data: {
        user_id: BigInt(createUserGalleryDto.user_id),
        media_id: BigInt(createUserGalleryDto.media_id),
      },
    });
  }

  async delete(deleteUserGalleryDto: UserGalleryDeleteDto) {
    return this.prisma.user_gallery.delete({
      where: {
        user_id_media_id: {
          user_id: BigInt(deleteUserGalleryDto.user_id),
          media_id: BigInt(deleteUserGalleryDto.media_id),
        },
      },
    });
  }

  async findByUserId(user_id: bigint) {
    return this.prisma.user_gallery.findMany({
      where: { user_id },
      include: { media: true },
    });
  }
}
