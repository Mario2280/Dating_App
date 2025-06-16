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
  Gender,
  PhotosPresence,
} from '@prisma/client';

export default class UserFilterDto {
  @IsNumber()
  @Min(18)
  @IsOptional()
  minAge?: number;

  @IsNumber()
  @Max(80)
  @IsOptional()
  maxAge?: number;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsString()
  @IsOptional()
  interests?: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsNumber()
  @IsOptional()
  distance: number;

  @IsString()
  @IsOptional()
  city: number;

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
  @IsArray()
  @IsEnum(Language, { each: true })
  languages?: Language[];

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
  @IsEnum(PhotosPresence)
  photoPresence?: PhotosPresence;

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

  @IsString()
  @IsOptional()
  orderBy?: 'age' | 'location';

  @IsString()
  @IsOptional()
  orderDirection?: 'asc' | 'desc';
}
