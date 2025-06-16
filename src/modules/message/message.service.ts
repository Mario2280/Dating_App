// src/message/message.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PrismaService } from '@services/prisma.service';
import { MessageCreateDto, MessageSendDto } from '@validation/message';

@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('CHAT_KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  async create(createMessageDto: MessageCreateDto) {
    const { sender_id, ...rest } = createMessageDto;
    const msg = await this.prisma.message.create({
      data: {
        ...rest,
        sender_id: BigInt(sender_id),
        sent_at: new Date().toISOString(),
        is_read: false,
      },
    });
    return msg;
  }

  send(msg: MessageSendDto) {
    this.kafkaClient.emit('chat-messages', {
      ...msg,
    });
  }
}
