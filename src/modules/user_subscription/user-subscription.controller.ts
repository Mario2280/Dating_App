import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import {
  UserSubscriptionCreateDto,
  UserSubscriptionUpdateDto,
} from '@validation/user_subscription';

@Controller('user-subscriptions')
export class UserSubscriptionController {
  constructor(private readonly service: UserSubscriptionService) {}

  @Post()
  create(@Body() createDto: UserSubscriptionCreateDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(BigInt(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UserSubscriptionUpdateDto,
  ) {
    return this.service.update(BigInt(id), updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(BigInt(id));
  }
}
