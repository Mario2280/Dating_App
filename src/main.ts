import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { msKafkaConsumer } from '@cfg/kafka.config';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(msKafkaConsumer);
  await app.startAllMicroservices();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
