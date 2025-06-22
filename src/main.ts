import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { msKafkaConsumer } from '@cfg/kafka.config';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.connectMicroservice(msKafkaConsumer);
  //await app.startAllMicroservices();

  app.enableCors({
    origin: process.env.FRONT_HOST || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
