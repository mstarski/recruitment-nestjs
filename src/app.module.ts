import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ShelterManagerModule } from './core/shelter-manager/shelter-manager.module';
import { DatabaseMode } from './database/database.types';
import { AdoptionManagerModule } from './core/adoption-manager/adoption-manager.module';
import { ShelterExplorerModule } from './core/shelter-explorer/shelter-explorer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule.forRootAsync({ mode: DatabaseMode.Dev }),
    ShelterManagerModule,
    AdoptionManagerModule,
    ShelterExplorerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
