import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import {
  SubscriptionPlanCreateDto,
  SubscriptionPlanUpdateDto,
} from '@validation/subscription_plan';

@Injectable()
export class SubscriptionPlanService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: SubscriptionPlanCreateDto) {
    return this.prisma.subscription_plan.create({
      data: {
        name: createDto.name,
        type: createDto.type,
        features: createDto.features,
        price: createDto.price,
        duration_days: createDto.duration_days,
        is_active: true,
      },
    });
  }

  async findAll() {
    return this.prisma.subscription_plan.findMany();
  }

  async findOne(id: number) {
    return this.prisma.subscription_plan.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateDto: SubscriptionPlanUpdateDto) {
    return this.prisma.subscription_plan.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number) {
    return this.prisma.subscription_plan.delete({
      where: { id },
    });
  }
}
