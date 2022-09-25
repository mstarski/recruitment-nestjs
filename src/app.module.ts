import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ShelterManagerModule } from './shelter-manager/shelter-manager.module';
import { DatabaseMode } from './database/database.types';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule.forRootAsync({ mode: DatabaseMode.Dev }),
    ShelterManagerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
