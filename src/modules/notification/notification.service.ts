import { Injectable } from '@nestjs/common';
import { TelegramNotificationService } from '@services/telegram-notification.service';
import { UserService } from '@modules/user/user.service';

interface NotificationSettingsDto {
  matches: boolean;
  messages: boolean;
  likes: boolean;
  super_likes: boolean;
  promotions: boolean;
  updates: boolean;
}

@Injectable()
export class NotificationService {
  constructor(
    private readonly telegramService: TelegramNotificationService,
    private readonly userService: UserService,
  ) {}

  async updateSettings(telegram_id: bigint, settings: NotificationSettingsDto) {
    // Convert boolean settings to bitmask
    let bitmask = 0;
    if (settings.matches) bitmask |= 1 << 0;
    if (settings.messages) bitmask |= 1 << 1;
    if (settings.likes) bitmask |= 1 << 2;
    if (settings.super_likes) bitmask |= 1 << 3;
    if (settings.promotions) bitmask |= 1 << 4;
    if (settings.updates) bitmask |= 1 << 5;

    return this.userService.updateNotificationSettings(telegram_id, bitmask);
  }

  async sendTestNotification(
    telegram_id: bigint,
    type: string,
    message: string,
  ) {
    return this.telegramService.sendNotification(
      telegram_id,
      type as any,
      message,
    );
  }
}
