import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import {
  UserSubscriptionCreateDto,
  UserSubscriptionUpdateDto,
} from '@validation/user_subscription';

@Injectable()
export class UserSubscriptionService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: UserSubscriptionCreateDto) {
    //return this.prisma.user_subscription.create({
    //  data: {
    //    user_id: BigInt(createDto.user_id),
    //    plan_code: createDto.plan_code,
    //    starts_at: new Date(createDto.starts_at),
    //    expires_at: new Date(createDto.expires_at),
    //    auto_renew: createDto.auto_renew,
    //    status: createDto.status,
    //    payment_id: createDto.payment_id,
    //  },
    //});
  }

  async findAll() {
    return this.prisma.user_subscription.findMany();
  }

  async findOne(id: bigint) {
    return this.prisma.user_subscription.findUnique({
      where: { id },
    });
  }

  async update(id: bigint, updateDto: UserSubscriptionUpdateDto) {
    return this.prisma.user_subscription.update({
      where: { id },
      data: {
        ...updateDto,
        starts_at: new Date().toISOString(),
        ...(updateDto.expires_at && {
          expires_at: new Date(updateDto.expires_at),
        }),
      },
    });
  }

  async remove(id: bigint) {
    return this.prisma.user_subscription.delete({
      where: { id },
    });
  }
}
