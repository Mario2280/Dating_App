import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import sharp from 'sharp';
import { PassThrough, Readable } from 'stream';
import {
  QUALITY_ARRAY,
  MAX_IMAGE_SIZE_BYTES,
  ONE_MINUTE,
  BIG_FILE_EXCEPTION,
  MAX_VIDEO_SIZE_BYTES,
} from '@const/uploader.constant';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegPath from 'ffmpeg-static';
import { IBucketData } from '@interfaces/bucket-data.interface';
import { IUploaderOptions } from '@interfaces/uploader-options.interface';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomBytes } from 'crypto';
import { Upload } from '@aws-sdk/lib-storage';
import { ConfigService } from '@nestjs/config';
import { getAwsConfig } from '@cfg/aws.config';

@Injectable()
export class UploaderService {
  private readonly client: S3Client;
  private readonly bucketData: IBucketData;
  private loggerService = new Logger(UploaderService.name);

  constructor(readonly configService: ConfigService) {
    const options: IUploaderOptions = getAwsConfig(configService);
    this.client = new S3Client(options.clientConfig);
    this.bucketData = options.bucketData;
    ffmpeg.setFfmpegPath(ffmpegPath as any);
  }

  private _generateFileName(fileType: string) {
    return `${randomBytes(8).toString('hex')}.${fileType}`;
  }

  private async _compressImage(buffer: Buffer): Promise<Buffer> {
    try {
      const image = sharp(buffer);
      const { format } = await image.metadata();

      if (format === 'heif') {
        return buffer;
      }

      return sharp(buffer).webp({ quality: QUALITY_ARRAY[0] }).toBuffer();
    } catch (error) {
      this.loggerService.error('Error converting image:', error);
      throw new Error(`Error converting image: ${error}`);
    }
  }

  private async _compressVideoAndUpload(
    multerStream: Readable,
    Key: string,
    fileSize: number,
  ) {
    const helpStream = new PassThrough();

    try {
      const parallelUpload = new Upload({
        client: this.client,
        params: {
          Bucket: this.bucketData.name,
          Key,
          Body: helpStream,
          ContentLength: fileSize,
        },
        queueSize: 2,

        // (optional) size of each part, in bytes, at least 5MB
        partSize: 1024 * 1024 * 5,

        // (optional) when true, do not automatically call AbortMultipartUpload when
        // a multipart upload fails to complete. You should then manually handle
        // the leftover parts.
        leavePartsOnError: false,
      });

      parallelUpload.on('httpUploadProgress', (progress) => {
        this.loggerService.log(progress);
      });
      ffmpeg(multerStream)
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputFormat('mp4')
        .outputOptions(['-movflags frag_keyframe+empty_moov'])
        .addOptions(['-crf 32'])
        .pipe(helpStream, { end: true });
      await parallelUpload.done();
    } catch (error) {
      this.loggerService.error('Error converting video:', error);
      throw new InternalServerErrorException('Error uploading video');
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const fileType = file.mimetype;
    const fileSize = file.size;
    let compressedFile: Buffer;
    const fileName = this._generateFileName(
      fileType.includes('video') ? 'mp4' : 'webp',
    );

    if (fileType.includes('image')) {
      if (fileSize > MAX_IMAGE_SIZE_BYTES) {
        throw new HttpException(
          BIG_FILE_EXCEPTION(fileSize, MAX_IMAGE_SIZE_BYTES),
          HttpStatus.PAYLOAD_TOO_LARGE,
        );
      }

      compressedFile = await this._compressImage(file.buffer);

      const command = new PutObjectCommand({
        Bucket: this.bucketData.name,
        Key: fileName,
        Body: compressedFile,
        ContentType: fileType,
      });
      await this.client.send(command);

      return fileName;
    }

    if (fileType.includes('video')) {
      if (fileSize > MAX_VIDEO_SIZE_BYTES)
        throw new HttpException(
          BIG_FILE_EXCEPTION(fileSize, MAX_VIDEO_SIZE_BYTES),
          HttpStatus.PAYLOAD_TOO_LARGE,
        );

      await this._compressVideoAndUpload(file.stream, fileName, file.size);

      return fileName;
    }
  }

  public deleteFile(Key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketData.name,
      Key,
    });
    this.client
      .send(command)
      .then(() => this.loggerService.log('File deleted successfully'))
      .catch((error) => {
        this.loggerService.error(error);
        throw new InternalServerErrorException(`Error deleting file ${Key}`);
      });
  }

  public getMediaUrlByKey(Key: string) {
    return getSignedUrl(
      this.client,
      new GetObjectCommand({
        Bucket: this.bucketData.name,
        Key,
      }),
      {
        expiresIn: ONE_MINUTE * 5,
      },
    );
  }
}
