import { Currency, PaymentStatus, PaymentType } from '@prisma/client';

export default class PaymentEntity {
  readonly id: string;

  readonly transaction_id: string;

  readonly user_id: string;

  readonly amount: number;

  readonly currency: Currency;

  readonly payment_method: PaymentType;

  readonly status: PaymentStatus;

  readonly metadata: string;

  readonly created_at: Date;
}
