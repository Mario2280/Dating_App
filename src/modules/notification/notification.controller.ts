import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';

interface NotificationSettingsDto {
  matches: boolean;
  messages: boolean;
  likes: boolean;
  super_likes: boolean;
  promotions: boolean;
  updates: boolean;
}

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Put('settings/:telegram_id')
  async updateNotificationSettings(
    @Param('telegram_id') telegram_id: string,
    @Body() settings: NotificationSettingsDto,
  ) {
    return this.notificationService.updateSettings(
      BigInt(telegram_id),
      settings,
    );
  }

  @Post('test/:telegram_id')
  async sendTestNotification(
    @Param('telegram_id') telegram_id: string,
    @Body() { type, message }: { type: string; message: string },
  ) {
    return this.notificationService.sendTestNotification(
      BigInt(telegram_id),
      type,
      message,
    );
  }
}
