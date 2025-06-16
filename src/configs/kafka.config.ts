import { Transport, KafkaOptions } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

export const msKafkaConsumer: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    consumer: {
      groupId: 'chat-consumer',
    },
    client: {
      clientId: 'chat',
      brokers: ['localhost:9092'],
    },
    subscribe: {
      fromBeginning: true,
    },
    producer: {
      allowAutoTopicCreation: true,
      createPartitioner: Partitioners.LegacyPartitioner,
    },
  },
};
