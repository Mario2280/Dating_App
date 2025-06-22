import {
  Purpose,
  Build,
  Language,
  SexualOrientation,
  Alcohol,
  Smoking,
  Kids,
  LivingConditions,
  Income,
  Education,
  Gender,
} from '@prisma/client';
import {
  IsNumber,
  IsString,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  Min,
  IsArray,
  IsObject,
} from 'class-validator';

export default class UserCreateDto {
  @IsString()
  telegram_id: string;

  @IsOptional()
  @IsString()
  chat_id?: string;

  @IsString()
  name: string;

  @Min(18)
  @Max(80)
  @IsNumber()
  age: number;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsEnum(Purpose)
  purpose?: Purpose;

  @IsOptional()
  @IsInt()
  @Min(30)
  @Max(250)
  weight?: number;

  @IsOptional()
  @IsInt()
  @Min(140)
  @Max(220)
  height?: number;

  @IsOptional()
  @IsEnum(Build)
  build?: Build;

  @IsOptional()
  @IsEnum(Language)
  language?: Language;

  @IsOptional()
  @IsEnum(SexualOrientation)
  orientation?: SexualOrientation;

  @IsOptional()
  @IsEnum(Alcohol)
  alcohol?: Alcohol;

  @IsOptional()
  @IsEnum(Smoking)
  smoking?: Smoking;

  @IsOptional()
  @IsEnum(Kids)
  kids?: Kids;

  @IsOptional()
  @IsEnum(LivingConditions)
  living_condition?: LivingConditions;

  @IsOptional()
  @IsEnum(Income)
  income?: Income;

  @IsOptional()
  @IsEnum(Education)
  education?: Education;

  @IsOptional()
  @IsArray()
  interests?: string[];

  @IsOptional()
  @IsInt()
  notification_settings?: number;

  // Instagram fields
  @IsOptional()
  @IsBoolean()
  instagram_connected?: boolean;

  @IsOptional()
  @IsString()
  instagram_user_id?: string;

  @IsOptional()
  @IsString()
  instagram_username?: string;

  @IsOptional()
  @IsString()
  instagram_access_token?: string;

  @IsOptional()
  @IsObject()
  instagram_profile_data?: any;

  @IsBoolean()
  is_visible: boolean;

  @IsString()
  location: string;

  @IsString()
  country_and_city: string;
  // Wallet data
  @IsOptional()
  @IsArray()
  wallets?: Array<{
    type: 'ton' | 'stripe';
    address?: string;
    chain?: string;
    metadata?: any;
  }>;
}
