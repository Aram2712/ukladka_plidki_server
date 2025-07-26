import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config();

async function bootstrap() {
  // let process;
  const httpsOptions = {
    key: readFileSync('/etc/letsencrypt/live/ukladka-plitki.ru/privkey.pem'),
    cert: readFileSync('/etc/letsencrypt/live/ukladka-plitki.ru/fullchain.pem'),
    secureProtocol: 'TLS_method',
    ciphers: [
      'ECDHE-ECDSA-AES128-GCM-SHA256',
      'ECDHE-RSA-AES128-GCM-SHA256',
      'ECDHE-ECDSA-AES256-GCM-SHA384',
      'ECDHE-RSA-AES256-GCM-SHA384',
      'ECDHE-ECDSA-CHACHA20-POLY1305',
      'ECDHE-RSA-CHACHA20-POLY1305',
      'DHE-RSA-AES128-GCM-SHA256',
      'DHE-RSA-AES256-GCM-SHA384',
      'TLS_AES_256_GCM_SHA384',
      'TLS_CHACHA20_POLY1305_SHA256',
      'TLS_AES_128_GCM_SHA256',
    ].join(':'),
    honorCipherOrder: true,
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    httpsOptions
  });
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.use(cookieParser());
  app.enableCors({
    origin: 'https://ukladka-plitki.ru',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}

bootstrap().then((r) => r);
