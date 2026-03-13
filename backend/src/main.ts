import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // frontend runs on :3000, so we need CORS for dev
  // TODO: configure this per environment for production
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(4000);
}
bootstrap();
