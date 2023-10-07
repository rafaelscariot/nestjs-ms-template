import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ApiKeyGuard } from './auth/guard/api-key.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// TODO usar dto excluindo dados que não devem ser retornados
// TODO testes
// TODO volumes no container do Postgres

async function bootstrap() {
  const logger = new Logger('src/main.ts');

  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new ApiKeyGuard());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest.js template')
    .setDescription('The Nest.js template description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        in: 'header',
      },
      'jwt-auth',
    )
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
