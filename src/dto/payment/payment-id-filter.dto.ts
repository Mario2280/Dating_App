import { IsUUID } from 'class-validator';

export default class PaymentIdFilterDto {
  @IsUUID()
  readonly id: string;
}
