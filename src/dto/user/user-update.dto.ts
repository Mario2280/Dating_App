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
  IsOptional,
  IsEnum,
  IsInt,
  Max,
  Min,
} from 'class-validator';

export default class UserUpdateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  interests?: any;

  @IsBoolean()
  @IsOptional()
  is_visible?: boolean;

  @IsString()
  @IsOptional()
  location: string;

  @IsOptional()
  @IsEnum(Purpose)
  purpose?: Purpose;

  @IsOptional()
  @IsInt()
  @Min(140)
  @Max(220)
  height?: number;

  @IsOptional()
  @IsInt()
  @Min(30)
  @Max(250)
  weight?: number;

  @IsOptional()
  @IsEnum(Build)
  build?: Build;

  @IsOptional()
  @IsEnum(Language)
  languages?: Language;

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
  livingCondition?: LivingConditions;

  @IsOptional()
  @IsEnum(Income)
  income?: Income;

  @IsOptional()
  @IsEnum(Education)
  education?: Education;
}
