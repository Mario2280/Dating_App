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

export default class UserResponseDto {
  id: bigint;

  telegram_id: bigint;

  name: string;

  age: number;

  gender: string;

  bio: string;

  interests: any;

  is_visible: boolean;

  location: string;

  purpose?: Purpose;

  height?: number;

  build?: Build;

  languages?: Language[];

  orientation?: SexualOrientation;

  alcohol?: Alcohol;

  smoking?: Smoking;

  kids?: Kids;

  livingCondition?: LivingConditions;

  income?: Income;

  education?: Education;

  created_at: Date;

  last_active: Date;
}
