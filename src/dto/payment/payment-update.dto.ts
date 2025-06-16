import { PaymentStatus } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export default class PaymentUpdateDto {
  @IsString()
  @IsOptional()
  readonly status: PaymentStatus;

  @IsString()
  @IsOptional()
  readonly metadata: string;
}
