import { Module } from '@nestjs/common';
import { SubscriptionPlanService } from './subscription-plan.service';
import { SubscriptionPlanController } from './subscription-plan.controller';
import { PrismaService } from '@services/prisma.service';

@Module({
  controllers: [SubscriptionPlanController],
  providers: [SubscriptionPlanService, PrismaService],
  exports: [SubscriptionPlanService],
})
export class SubscriptionPlanModule {}
