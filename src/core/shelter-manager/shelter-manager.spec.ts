import { Test } from '@nestjs/testing';
import { ShelterManager } from './shelter-manager';
import { CatFixtureFactory } from '../../fixtures/cat.fixture';
import { AdoptionView } from '../../views/adoption.view';
import { RegistrationView } from '../../views/registration.view';
import { ShelterSearchResultDto } from '../dto/shelter-search-result.dto';
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
import { SeederTool, SeedResult } from '../../tools/seeder.tool';
import { DataSource } from 'typeorm';

describe('Shelter management', () => {
  let shelterManager: ShelterManager;
  let dataSource: DataSource;
  let seedingResult: SeedResult;

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

    seedingResult = await SeederTool.seed(dataSource);
  });

  it('Can register a new Cat', async () => {
    // Arrange
    const catCandidate = catFixtureFactory.generateDraft();
    const shelter = seedingResult.shelters[0];

    // Act
    const response = await shelterManager.registerCat(catCandidate, shelter.id);

    // Assert
    expect(response).toBeInstanceOf(RegistrationView);
  });

  it('Can give a cat to adoption', async () => {
    const cat = seedingResult.cats[0];
    const client = seedingResult.clients[0];

    const response = await shelterManager.adopt(cat.id, client.id);

    expect(response).toBeInstanceOf(AdoptionView);
  });

  it(`Can get shelter's cats in paginated manner`, async () => {
    const response = null;
    expect(response).toBeInstanceOf(ShelterSearchResultDto);
  });
});
