import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    api: 'api',
    origin: '*',
    version: 'v2',
  };
  app.setGlobalPrefix(`${options.api}/${options.version}`);
  await app.listen(3000);
}
bootstrap();
