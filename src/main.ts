import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DataSourceImpl } from './database/database.types';
import { SeederTool } from './tools/seeder.tool';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);

  const dataSource = await app.get(DataSourceImpl);
  await SeederTool.seed(dataSource);

  const appPort = config.get('http.port') || 8000;

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(appPort, () => console.log(`Listening on ${appPort} 🚀`));
}

void bootstrap();
