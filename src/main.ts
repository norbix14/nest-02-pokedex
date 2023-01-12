import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const ENV = process.env;

  const API_MODE: string = ENV.API_MODE;

  let PROTOCOL: string, HOST: string, PORT: number;

  if (API_MODE === 'production') {
    PROTOCOL = ENV.PROTOCOL;
    HOST = ENV.HOST;
    PORT = parseInt(ENV.PORT);
  } else {
    PROTOCOL = ENV.PROTOCOL || 'http';
    HOST = ENV.HOST || 'localhost';
    PORT = parseInt(ENV.PORT) || 3000;
  }

  const API_OPTS = {
    host: HOST,
    mode: API_MODE,
    name: 'api',
    origin: '*',
    port: PORT,
    protocol: PROTOCOL,
    version: 'v2',
  };

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`${API_OPTS.name}/${API_OPTS.version}`);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  await app.listen(API_OPTS.port, API_OPTS.host, () => {
    const url = `${API_OPTS.protocol}://${API_OPTS.host}:${API_OPTS.port}`;
    console.log(`Server running on [${url}]`);
  });
}

bootstrap();
