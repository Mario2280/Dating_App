import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { UploaderService } from '@modules/uploader/uploader.service';
import { MediaCreateDto } from '@validation/media';
@Injectable()
export class MediaService {
  constructor(
    public prisma: PrismaService,
    public uploadService: UploaderService,
  ) {}

  async create(files: Array<Express.Multer.File>, fileInfo: MediaCreateDto) {
    try {
      const links = [];
      for (const el of files) {
        const file = el;
        const fileName = await this.uploadService.uploadFile(file);
        const type = file.mimetype.includes('image') ? 'Image' : 'Video';
        if (fileName) {
          const { id } = await this.prisma.media.create({
            data: {
              message_id: fileInfo.message_id ?? null,
              type,
              aws_file_key: fileName,
            },
            relationLoadStrategy: 'query',
            select: {
              id: true,
            },
          });
          links.push(id.toString());
        }
      }
      return { links };
    } catch (error) {
      throw new Error((error as unknown as Error).message);
    }
  }

  async delete(id: bigint) {
    const delMedia = await this.prisma.media.findUnique({
      where: { id },
    });
    if (!delMedia) throw new Error(`File with id ${id} does not exist`);
    await Promise.all([
      this.uploadService.deleteFile(delMedia.aws_file_key),
      this.prisma.media.delete({ where: { id } }),
    ]);
  }
}
