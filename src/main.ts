import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    console.info(`Nest.js started at port ${PORT}`);
  });
}
bootstrap();
