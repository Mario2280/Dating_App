import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@services/prisma.service';
import {
  UserCreateDto,
  UserUpdateDto,
  UserEntity,
  UserFilterDto,
} from '@validation/user';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userData: UserCreateDto): Promise<UserEntity> {
    return await this.prisma.profile.create({
      data: {
        ...userData,
        telegram_id: BigInt(userData.telegram_id),
        last_active: new Date(),
        created_at: new Date(),
      },
    });
  }

  async findMany(filters: UserFilterDto) {
    const query = Prisma.sql`
      SELECT 
        u.*,
        ST_Distance(
          ST_GeomFromText(u.location, 4326)::geography,
          ST_GeomFromText(${filters.location}, 4326)::geography
        ) / 1000 AS distance_km
      FROM "user" u
      WHERE ST_DWithin(
        ST_GeomFromText(u.location, 4326)::geography,
        ST_GeomFromText(${filters.location}, 4326)::geography,
        ${filters.radius * 1000}
      )
      ${this.buildSqlConditions(filters)}
      ORDER BY distance_km ASC
      LIMIT ${filters.take || 100}
      OFFSET ${filters.skip || 0}
      `;
    const filteredProfiles = await this.prisma.$queryRaw(query);
    return filteredProfiles;
  }

  async findOne(telegram_id: bigint) {
    return this.prisma.profile.findFirst({
      where: {
        telegram_id,
      },
    });
  }

  async update(id: bigint, data: UserUpdateDto): Promise<UserEntity> {
    return this.prisma.profile.update({
      where: { id },
      data: {
        ...data,
        last_active: new Date(),
      },
    });
  }

  private buildSqlConditions(where: UserFilterDto): Prisma.Sql {
    let conditions = Prisma.empty;

    if (where.location !== undefined) {
      conditions = Prisma.sql`${conditions} AND u.last_active > CURRENT_DATE - INTERVAL '${where.last_active_older_than_months} months'`;
    }

    if (where.last_active_older_than_months !== undefined) {
      conditions = Prisma.sql`${conditions} AND u.last_active > CURRENT_DATE - INTERVAL '${where.last_active_older_than_months} months'`;
    }
    if (where.minAge) {
      conditions = Prisma.sql`${conditions} AND u.age >= ${where.minAge}`;
    }

    if (where.maxAge) {
      conditions = Prisma.sql`${conditions} AND u.age >= ${where.maxAge}`;
    }

    if (where.gender) {
      conditions = Prisma.sql`${conditions} AND u.gender = ${where.gender}`;
    }

    // Фильтр по цели знакомств
    if (where.purpose) {
      conditions = Prisma.sql`${conditions} AND u.purpose = ${where.purpose}`;
    }

    if (where.minWeight) {
      conditions = Prisma.sql`${conditions} AND u.weight >= ${where.minWeight}`;
    }
    if (where.maxWeight) {
      conditions = Prisma.sql`${conditions} AND u.weight <= ${where.maxWeight}`;
    }

    if (where.minHeight) {
      conditions = Prisma.sql`${conditions} AND u.height >= ${where.minHeight}`;
    }
    if (where.maxHeight) {
      conditions = Prisma.sql`${conditions} AND u.height <= ${where.maxHeight}`;
    }

    if (where.build) {
      conditions = Prisma.sql`${conditions} AND u.build = ${where.build}`;
    }

    if (where.languages) {
      conditions = Prisma.sql`${conditions} AND u.languages @> ${JSON.stringify(where.languages)}::jsonb`;
    }

    // Фильтр по ориентации
    if (where.orientation) {
      conditions = Prisma.sql`${conditions} AND u.orientation = ${where.orientation}`;
    }

    if (where.alcohol) {
      conditions = Prisma.sql`${conditions} AND u.alcohol = ${where.alcohol}`;
    }

    if (where.smoking) {
      conditions = Prisma.sql`${conditions} AND u.smoking = ${where.smoking}`;
    }

    if (where.kids) {
      conditions = Prisma.sql`${conditions} AND u.kids = ${where.kids}`;
    }

    if (where.livingCondition) {
      conditions = Prisma.sql`${conditions} AND u.living_condition = ${where.livingCondition}`;
    }

    if (where.income) {
      conditions = Prisma.sql`${conditions} AND u.income = ${where.income}`;
    }

    if (where.education) {
      conditions = Prisma.sql`${conditions} AND u.education = ${where.education}`;
    }

    if (where.is_visible !== undefined) {
      conditions = Prisma.sql`${conditions} AND u.is_visible = ${where.is_visible}`;
    }

    return conditions;
  }
}
