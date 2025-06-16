import { Module } from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import { UserSubscriptionController } from './user-subscription.controller';
import { PrismaService } from '@services/prisma.service';

@Module({
  controllers: [UserSubscriptionController],
  providers: [UserSubscriptionService, PrismaService],
  exports: [UserSubscriptionService],
})
export class UserSubscriptionModule {}
