import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { fastifyHelmet } from 'fastify-helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // global url prefix
  app.setGlobalPrefix('/api');

  // middlewares
  /**
   * When using fastify-swagger and helmet, there may be a problem *  * with CSP, to solve this collision, configure the CSP as shown * * below:
   * source: https://docs.nestjs.com/openapi/introduction
   */
  app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  // registering fastify helmet and disabling content security policy
  // if not it will not work
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });

  // enable cors policy
  app.enableCors();

  // global data transformation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // setting fastify swagger
  const config = new DocumentBuilder()
    .setTitle('VoxTube')
    .setDescription('The VoxTube API description')
    .setVersion('1.0')
    .addTag('VoxTube')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 5000;
  const host = process.env.HOST || '0.0.0.0';
  await app.listen(port, host);
}
bootstrap();
