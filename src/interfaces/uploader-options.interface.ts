import type { S3ClientConfig } from '@aws-sdk/client-s3';
import type { IBucketData } from './bucket-data.interface';
//import type { IUploaderMiddlewareOptions } from './uploader-middleware-options.interface';

export interface IUploaderOptions {
  clientConfig: S3ClientConfig;
  bucketData: IBucketData;
  //middleware: IUploaderMiddlewareOptions;
}
