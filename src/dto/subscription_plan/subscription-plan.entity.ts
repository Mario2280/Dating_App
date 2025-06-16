export default class SubscriptionPlanEntity {
  readonly id: number;

  readonly name: string;

  readonly type: string;

  readonly features: string;

  readonly price: number;

  readonly duration_days: number;

  readonly is_active: boolean;
}
