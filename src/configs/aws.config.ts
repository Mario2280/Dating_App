import { ConfigService } from '@nestjs/config';
import { IUploaderOptions } from '@interfaces/uploader-options.interface';

export const getAwsConfig = (
  configService: ConfigService,
): IUploaderOptions => {
  return {
    clientConfig: {
      forcePathStyle: false,
      region: configService.get('BUCKET_REGION'),
      endpoint: configService.get('BUCKET_HOST'),
      credentials: {
        accessKeyId: configService.get('BUCKET_ACCESS_KEY'),
        secretAccessKey: configService.get('BUCKET_SECRET_KEY'),
      },
    },
    bucketData: {
      name: configService.get('BUCKET_NAME'),
      folder: '',
      appUuid: '', 
      url: '', 
    },

  };
};
