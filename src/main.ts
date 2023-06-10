import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';

import { HttpExceptionFilter } from './shared/http-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  app.use(compression());

  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV === 'development') {
    console.log(`\x1b[32m Server start PORT: ${PORT}`);
  }
}
bootstrap();
