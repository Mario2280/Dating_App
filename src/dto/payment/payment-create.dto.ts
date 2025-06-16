import { Currency, PaymentType } from '@prisma/client';
import { IsDecimal, IsString } from 'class-validator';

export default class PaymentCreateDto {
  @IsString()
  readonly transaction_id: string;

  @IsString()
  readonly user_id: string;

  @IsDecimal()
  readonly amount: number;

  @IsString()
  readonly currency: Currency;

  @IsString()
  readonly payment_method: PaymentType;

  @IsString()
  readonly metadata: string;
}
