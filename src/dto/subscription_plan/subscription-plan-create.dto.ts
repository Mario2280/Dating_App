import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export default class SubscriptionPlanCreateDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly type: string;

  @IsString()
  readonly features: string;

  @IsDecimal()
  readonly price: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly duration_days: number;
}
