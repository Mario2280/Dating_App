import { MediaService } from './media.service';
import {
  Controller,
  Delete,
  HttpException,
  Post,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { MediaCreateDto } from '@validation/media';
import {
  BIG_FILE_EXCEPTION,
  MAX_IMAGE_SIZE_BYTES,
  MAX_VIDEO_SIZE_BYTES,
  ONE_MB_IN_BYTES,
} from '@const/uploader.constant';
import { RoutesEntities } from '@root/constants/routes-entities';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller(RoutesEntities.MEDIA)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('create')
  @UseInterceptors(
    FilesInterceptor('file', 5, {
      fileFilter: (req, file, cb) => {
        // Проверка типа файла и лимита размера
        if (file.mimetype.match(/^image\/(jpeg|jpg|png)$/)) {
          if (file.size > 5 * ONE_MB_IN_BYTES) {
            return cb(
              new HttpException(
                BIG_FILE_EXCEPTION(file.size, MAX_IMAGE_SIZE_BYTES),
                HttpStatus.PAYLOAD_TOO_LARGE,
              ),
              false,
            );
          }
        } else if (file.mimetype === 'video/mp4') {
          if (file.size > 100 * ONE_MB_IN_BYTES) {
            return cb(
              new HttpException(
                BIG_FILE_EXCEPTION(file.size, MAX_VIDEO_SIZE_BYTES),
                HttpStatus.PAYLOAD_TOO_LARGE,
              ),
              false,
            );
          }
        } else {
          return cb(
            new HttpException(
              'Only images (jpg, jpeg, png) and MP4 videos are allowed!',
              HttpStatus.UNSUPPORTED_MEDIA_TYPE,
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @Body() mediaDto: MediaCreateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<{ links: string[] }> {
    return await this.mediaService.create(files, mediaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.mediaService.delete(BigInt(id));
  }
}
