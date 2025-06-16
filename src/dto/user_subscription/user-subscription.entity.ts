import { SubscriptionStatus } from '@prisma/client';

export default class UserSubscriptionEntity {
  id: bigint;

  user_id: string;

  plan_code: number;

  starts_at: Date;

  expires_at: Date;

  auto_renew: boolean;

  status: SubscriptionStatus;

  payment_id?: string;
}
