import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserService } from '@modules/user/user.service';

interface TelegramMessage {
  chat_id: string;
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
  reply_markup?: any;
}

@Injectable()
export class TelegramNotificationService {
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN;
  private readonly apiUrl = `https://api.telegram.org/bot${this.botToken}`;

  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async sendNotification(
    telegram_id: bigint,
    notificationType:
      | 'matches'
      | 'messages'
      | 'likes'
      | 'super_likes'
      | 'promotions'
      | 'updates',
    message: string,
    additionalData?: any,
  ): Promise<boolean> {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { telegram_id },
        select: { chat_id: true, notification_settings: true },
      });

      if (!profile?.chat_id) {
        console.log(`No chat_id found for user ${telegram_id}`);
        return false;
      }

      // Check if notification type is enabled
      if (
        !this.userService.isNotificationEnabled(
          profile.notification_settings,
          notificationType,
        )
      ) {
        console.log(
          `Notification type ${notificationType} is disabled for user ${telegram_id}`,
        );
        return false;
      }

      const telegramMessage: TelegramMessage = {
        chat_id: profile.chat_id.toString(),
        text: message,
        parse_mode: 'HTML',
      };

      // Add inline keyboard for certain notification types
      if (notificationType === 'matches' && additionalData?.profileId) {
        telegramMessage.reply_markup = {
          inline_keyboard: [
            [
              {
                text: '💬 Написать сообщение',
                callback_data: `message_${additionalData.profileId}`,
              },
              {
                text: '👀 Посмотреть профиль',
                callback_data: `profile_${additionalData.profileId}`,
              },
            ],
          ],
        };
      }

      const response = await fetch(`${this.apiUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(telegramMessage),
      });

      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
      return false;
    }
  }

  async sendMatchNotification(
    userTelegramId: bigint,
    matchedUserName: string,
    matchedUserId: bigint,
  ): Promise<boolean> {
    const message = `🎉 <b>Новое совпадение!</b>\n\n💕 Вы понравились ${matchedUserName}! Самое время начать общение.`;

    return this.sendNotification(userTelegramId, 'matches', message, {
      profileId: matchedUserId,
    });
  }

  async sendMessageNotification(
    userTelegramId: bigint,
    senderName: string,
  ): Promise<boolean> {
    const message = `💬 <b>Новое сообщение</b>\n\n${senderName} написал(а) вам сообщение!`;

    return this.sendNotification(userTelegramId, 'messages', message);
  }

  async sendLikeNotification(
    userTelegramId: bigint,
    likerName: string,
  ): Promise<boolean> {
    const message = `❤️ <b>Новый лайк!</b>\n\n${likerName} поставил(а) вам лайк!`;

    return this.sendNotification(userTelegramId, 'likes', message);
  }

  async sendSuperLikeNotification(
    userTelegramId: bigint,
    likerName: string,
  ): Promise<boolean> {
    const message = `⭐ <b>Супер лайк!</b>\n\n${likerName} поставил(а) вам супер лайк! Вы точно произвели впечатление!`;

    return this.sendNotification(userTelegramId, 'super_likes', message);
  }

  async sendPromotionNotification(
    userTelegramId: bigint,
    promotionText: string,
  ): Promise<boolean> {
    return this.sendNotification(userTelegramId, 'promotions', promotionText);
  }

  async sendUpdateNotification(
    userTelegramId: bigint,
    updateText: string,
  ): Promise<boolean> {
    return this.sendNotification(userTelegramId, 'updates', updateText);
  }
}
