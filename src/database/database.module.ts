import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseMode, DataSourceImpl } from './database.types';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CatEntity } from './entities/cat.entity';
import { ClientEntity } from './entities/client.entity';
import { ShelterEntity } from './entities/shelter.entity';
import {
  AdoptionRepositoryImpl,
  CatRepositoryImpl,
  ClientRepositoryImpl,
  RegistrationRepositoryImpl,
  ShelterRepositoryImpl,
} from '../models/model.types';
import { CatRepository } from '../models/cat/cat.repository';
import { ShelterRepository } from '../models/shelter/shelter.repository';
import { ClientRepository } from '../models/client/client.repository';
import { entities } from './entities';
import { AdoptionRepository } from '../models/adoption/adoption.repository';
import { RegistrationRepository } from '../models/registration/registration.repository';

export interface DatabaseModuleConfig {
  mode: DatabaseMode;
}

@Global()
@Module({})
export class DatabaseModule {
  static forRootAsync(config: DatabaseModuleConfig): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        DatabaseModule.createDataSource(config),
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

        {
          provide: AdoptionRepositoryImpl,
          useFactory: (dataSource: DataSource) =>
            new AdoptionRepository(dataSource),
          inject: [DataSourceImpl],
        },
        {
          provide: RegistrationRepositoryImpl,
          useFactory: (dataSource) => new RegistrationRepository(dataSource),
          inject: [DataSourceImpl],
        },
      ],
      exports: [
        DataSourceImpl,
        CatRepositoryImpl,
        ShelterRepositoryImpl,
        ClientRepositoryImpl,
        AdoptionRepositoryImpl,
        RegistrationRepositoryImpl,
      ],
    };
  }

  private static createDataSource(config: DatabaseModuleConfig): Provider {
    return {
      provide: DataSourceImpl,
      useFactory: (configService: ConfigService) => {
        let dataSourceOptions: Partial<DataSourceOptions>;

        if (config.mode === DatabaseMode.Dev) {
          dataSourceOptions = {
            type: configService.getOrThrow('db.dev.type'),
            database: configService.getOrThrow('db.dev.database'),
          } as Partial<DataSourceOptions>;
        } else if (config.mode === DatabaseMode.UnitTest) {
          dataSourceOptions = {
            type: 'sqlite',
            database: ':memory:',
          };
        }

        const ds = new DataSource({
          ...dataSourceOptions,
          synchronize: true,
          entities: [...entities],
        } as DataSourceOptions);

        return ds.initialize();
      },

      inject: [ConfigService],
    };
  }
}
