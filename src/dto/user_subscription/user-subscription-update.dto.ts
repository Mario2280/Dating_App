import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export default class UserSubscriptionUpdateDto {
  @IsDateString()
  @IsOptional()
  readonly expires_at: Date;

  @IsBoolean()
  @IsOptional()
  readonly auto_renew: boolean;

  @IsString()
  @IsOptional()
  readonly payment_id?: string;
}
