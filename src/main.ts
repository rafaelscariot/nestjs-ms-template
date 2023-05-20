import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AuthorizationGuard } from './auth/guard/authorization.guard';

async function bootstrap() {
  const logger = new Logger('src/main.ts');

  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new AuthorizationGuard());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest.js template')
    .setDescription('The Nest.js template description')
    .setVersion('1.0')
    .addTag('user', 'user crud')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Template API',
    customCss: '.swagger-ui .topbar {display: none}',
  });

  const PORT = process.env.NESTJS_PORT;

  await app.listen(Number(PORT), () => {
    logger.log(`API running at port ${PORT}`);
  });
}

bootstrap();
