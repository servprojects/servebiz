import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { Reflector } from "@nestjs/core";
import { AuthGuard } from './app/auth/guard/auth.guard';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(cookieParser());
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector));
  await app.listen(3000);
 
}
bootstrap();
