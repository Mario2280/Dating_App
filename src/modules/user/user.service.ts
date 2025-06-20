import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { PrismaService } from '@services/prisma.service';
import type {
  UserCreateDto,
  UserUpdateDto,
  UserEntity,
  UserFilterDto,
} from '@validation/user';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userData: UserCreateDto): Promise<UserEntity> {
    const { wallets, ...profileData } = userData;

    return await this.prisma.$transaction(async (tx) => {
      // Create profile
      const profile = await tx.profile.create({
        data: {
          ...profileData,
          telegram_id: BigInt(userData.telegram_id),
          chat_id: userData.chat_id ? BigInt(userData.chat_id) : null,
          last_active: new Date(),
          created_at: new Date(),
          interests: userData.interests || [],
          notification_settings: userData.notification_settings || 47, // Default: all enabled except super_likes
        },
      });

      // Create wallets if provided
      if (wallets && wallets.length > 0) {
        for (const walletData of wallets) {
          await tx.wallet.create({
            data: {
              profile_id: profile.id,
              type: walletData.type,
              address: walletData.address,
              chain: walletData.chain,
              metadata: walletData.metadata || {},
              is_default: true, // First wallet is default
            },
          });
        }
      }

      return profile;
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
      FROM "Profile" u
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
      include: {
        wallet: true,
        gallery: {
          include: {
            media: true,
          },
        },
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

  async updateNotificationSettings(
    telegram_id: bigint,
    settings: number,
  ): Promise<UserEntity> {
    return this.prisma.profile.update({
      where: { telegram_id },
      data: {
        notification_settings: settings,
        last_active: new Date(),
      },
    });
  }

  // Helper method to check if specific notification is enabled
  isNotificationEnabled(
    settings: number,
    notificationType:
      | 'matches'
      | 'messages'
      | 'likes'
      | 'super_likes'
      | 'promotions'
      | 'updates',
  ): boolean {
    const bitMap = {
      matches: 0,
      messages: 1,
      likes: 2,
      super_likes: 3,
      promotions: 4,
      updates: 5,
    };

    return (settings & (1 << bitMap[notificationType])) !== 0;
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
