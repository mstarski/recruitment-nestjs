import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DataSourceImpl } from './database/database.types';
import { SeederTool } from './tools/seeder.tool';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.enableVersioning();

  const openAPIConfig = new DocumentBuilder()
    .setTitle('NestJS Shelter')
    .setDescription('Simple NestJS project meant for recruitment purposes.')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, openAPIConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  const config = await app.get(ConfigService);

  const dataSource = await app.get(DataSourceImpl);
  await SeederTool.seed(dataSource);

  const appPort = config.get('http.port') || 8000;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(appPort, () => console.log(`Listening on ${appPort} 🚀`));
}

void bootstrap();
