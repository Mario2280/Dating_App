import { SubscriptionStatus } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';

export default class UserSubscriptionCreateDto {
  @IsString()
  user_id: string;

  @IsInt()
  @IsNotEmpty()
  plan_code: number;

  @IsDateString()
  @IsNotEmpty()
  starts_at: Date;

  @IsDateString()
  @IsNotEmpty()
  expires_at: Date;

  @IsBoolean()
  @IsNotEmpty()
  auto_renew: boolean;

  @IsEnum(SubscriptionStatus)
  status: SubscriptionStatus;

  @IsString()
  @IsOptional()
  payment_id?: string;
}
