import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSourceImpl } from './database.types';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CatEntity } from './entities/cat.entity';
import { ClientEntity } from './entities/client.entity';
import { ShelterEntity } from './entities/shelter.entity';
import {
  CatRepositoryImpl,
  ClientRepositoryImpl,
  ShelterRepositoryImpl,
} from '../models/model.types';
import { CatRepository } from '../models/cat/cat.repository';
import { ShelterRepository } from '../models/shelter/shelter.repository';
import { ClientRepository } from '../models/client/client.repository';
import { entities } from './entities';

@Global()
@Module({
  providers: [
    {
      provide: DataSourceImpl,
      useFactory: (configService: ConfigService) => {
        const ds = new DataSource({
          type: configService.getOrThrow('db.dev.type'),
          database: configService.getOrThrow('db.dev.database'),
          synchronize: true,
          entities: [...entities],
        } as DataSourceOptions);

        return ds.initialize();
      },

      inject: [ConfigService],
    },

    {
      provide: CatRepositoryImpl,
      useFactory: (dataSource: DataSource) =>
        new CatRepository(dataSource.getRepository(CatEntity)),
      inject: [DataSourceImpl],
    },
    {
      provide: ShelterRepositoryImpl,
      useFactory: (dataSource: DataSource) =>
        new ShelterRepository(dataSource.getRepository(ShelterEntity)),
      inject: [DataSourceImpl],
    },

    {
      provide: ClientRepositoryImpl,
      useFactory: (dataSource: DataSource) =>
        new ClientRepository(dataSource.getRepository(ClientEntity)),
      inject: [DataSourceImpl],
    },
  ],
  exports: [
    DataSourceImpl,
    CatRepositoryImpl,
    ShelterRepositoryImpl,
    ClientRepositoryImpl,
  ],
})
export class DatabaseModule {}
