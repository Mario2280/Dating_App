import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UserGalleryService } from './user_gallery.service';
import {
  UserGalleryCreateDto,
  UserGalleryDeleteDto,
} from '@validation/user_gallery';
import { AWSMediaFileInterceptor } from '@root/interceptors/aws-media.interseptor';

@Controller('user-gallery')
export class UserGalleryController {
  constructor(private readonly userGalleryService: UserGalleryService) {}

  @Post()
  create(@Body() userGalleryCreateDto: UserGalleryCreateDto) {
    return this.userGalleryService.create(userGalleryCreateDto);
  }

  @Delete()
  delete(@Body() deleteUserGalleryDto: UserGalleryDeleteDto) {
    return this.userGalleryService.delete(deleteUserGalleryDto);
  }

  @Get(':user_id')
  @UseInterceptors(AWSMediaFileInterceptor)
  findByUserId(@Param('user_id') user_id: string) {
    return this.userGalleryService.findByUserId(BigInt(user_id));
  }
}
