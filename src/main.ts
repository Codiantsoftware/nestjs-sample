import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/exception';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import helmet from 'helmet';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  

  // Set views directory and view engine for EJS
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  
  // Serve static files
  app.use('/assets', express.static(path.resolve(__dirname, 'uploads')));
  app.use('/images', express.static(path.resolve(__dirname, 'images')));
  app.use('/public', express.static(path.resolve(__dirname, 'public')));

   // Enable Helmet middleware
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8000);
  console.log('Nest.js application is now listening on port 8000');
}
bootstrap();
