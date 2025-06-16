import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export default class SubscriptionPlanUpdateDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly type: string;

  @IsString()
  @IsOptional()
  readonly features: string;

  @IsDecimal()
  @IsOptional()
  readonly price: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @IsNotEmpty()
  readonly duration_days: number;
}
