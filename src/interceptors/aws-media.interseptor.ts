/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UploaderService } from '@modules/uploader/uploader.service';
import { PrismaService } from '@services/prisma.service';

export function AWSMediaFileInterceptor() {
  return UseInterceptors(S3FileInterceptor);
}

export class S3FileInterceptor implements NestInterceptor {
  constructor(
    private readonly s3Service: UploaderService,
    private readonly prisma: PrismaService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    return next.handle().pipe(
      map(async (responseData: any) => {
        const stack = [{ dto: responseData }];

        while (stack.length > 0) {
          const currentObj = stack.pop();

          for (const key in currentObj.dto) {
            if (typeof currentObj.dto[key] === 'object') {
              stack.push({ dto: currentObj.dto[key] });
            }
            if (key === 'aws_file_key') {
              responseData.aws_file_key = await this.s3Service.getMediaUrlByKey(
                currentObj.dto[key],
              );
            }
          }
        }
      }),
    );
  }
}
