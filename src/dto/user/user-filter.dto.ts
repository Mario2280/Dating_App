import {
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  IsPositive,
  Min,
  Max,
  IsArray,
  IsInt,
  IsBoolean,
} from 'class-validator';
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
} from '@prisma/client';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  ALL = 'ALL',
}

export default class UserFilterDto {
  @IsNumber()
  @Min(18)
  @IsOptional()
  minAge?: number;

  @IsNumber()
  @Max(222)
  @IsOptional()
  maxAge?: number;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsString()
  location: string;

  @IsOptional()
  @IsEnum(Purpose)
  purpose?: Purpose;

  @IsOptional()
  @IsInt()
  @Min(40)
  @Max(200)
  minWeight?: number;

  @IsOptional()
  @IsInt()
  @Min(40)
  @Max(200)
  maxWeight?: number;

  @IsOptional()
  @IsInt()
  @Min(140)
  @Max(220)
  minHeight?: number;

  @IsOptional()
  @IsInt()
  @Min(140)
  @Max(220)
  maxHeight?: number;

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
  livingCondition?: LivingConditions;

  @IsOptional()
  @IsEnum(Income)
  income?: Income;

  @IsOptional()
  @IsEnum(Education)
  education?: Education;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  radius?: number; // в километрах

  @IsOptional()
  @IsBoolean()
  is_visible: boolean;

  @IsInt()
  @IsOptional()
  last_active_older_than_months?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  take?: number;

  @IsNumber()
  @IsOptional()
  skip?: number;
}
