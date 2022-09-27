import { Test } from '@nestjs/testing';
import { ShelterManager } from './shelter-manager';
import { CatFixtureFactory } from '../../fixtures/cat.fixture';
import { RegistrationView } from '../../views/registration.view';
import {
  CatRepositoryImpl,
  ClientRepositoryImpl,
  ShelterRepositoryImpl,
} from '../../repositories/repository.token';
import { createMock } from '@golevelup/ts-jest';
import { CatRepository } from '../../repositories/cat.repository';
import { ShelterRepository } from '../../repositories/shelter.repository';
import { ClientRepository } from '../../repositories/client.repository';
import { DatabaseMode, DataSourceImpl } from '../../database/database.types';
import { DatabaseModule } from '../../database/database.module';
import { ConfigService } from '@nestjs/config';
import { SeederTool, SeedingResult } from '../../tools/seeder.tool';
import { DataSource } from 'typeorm';

describe('Shelter Manager', () => {
  let shelterManager: ShelterManager;
  let dataSource: DataSource;
  let seedingResult: SeedingResult;

  const catFixtureFactory = new CatFixtureFactory();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule.forRootAsync({ mode: DatabaseMode.UnitTest })],
      providers: [ShelterManager],
    })
      .useMocker((token) => {
        if (token === CatRepositoryImpl) {
          return createMock<CatRepository>();
        } else if (token === ShelterRepositoryImpl) {
          return createMock<ShelterRepository>();
        } else if (token === ClientRepositoryImpl) {
          return createMock<ClientRepository>();
        } else if (token === ConfigService) {
          return createMock<ConfigService>();
        }
      })
      .compile();

    shelterManager = module.get<ShelterManager>(ShelterManager);
    dataSource = module.get<DataSource>(DataSourceImpl);

    seedingResult = await SeederTool.seed(dataSource, true, false);
  });

  it('Can register a new Cat', async () => {
    const catCandidate = catFixtureFactory.generate();
    const shelter = seedingResult.shelters[0];

    const response = await shelterManager.registerCat(catCandidate, shelter.id);

    expect(response).toBeInstanceOf(RegistrationView);
  });
});
