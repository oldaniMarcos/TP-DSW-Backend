import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AuthGuard } from './auth/guards/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //permitir validaciones a nivel global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new AuthGuard(jwtService, reflector))

  app.enableCors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });

  await app.listen(3000);

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true
  })
}
bootstrap();
