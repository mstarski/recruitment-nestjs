import { AdoptionView } from '../../views/adoption.view';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../database/database.module';
import { DatabaseMode, DataSourceImpl } from '../../database/database.types';
import {
  CatRepositoryImpl,
  ClientRepositoryImpl,
  ShelterRepositoryImpl,
} from '../../repositories/repository.token';
import { createMock } from '@golevelup/ts-jest';
import { CatRepository } from '../../repositories/cat.repository';
import { ShelterRepository } from '../../repositories/shelter.repository';
import { ClientRepository } from '../../repositories/client.repository';
import { ConfigService } from '@nestjs/config';
import { AdoptionManager } from './adoption-manager';
import { SeederTool, SeedingResult } from '../../tools/seeder.tool';
import { DataSource } from 'typeorm';
import { AdoptCatDto } from '../../dto/adopt-cat.dto';

describe('Adoption Manager', () => {
  let adoptionManager: AdoptionManager;
  let dataSource: DataSource;

  let seedingResult: SeedingResult;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule.forRootAsync({ mode: DatabaseMode.UnitTest })],
      providers: [AdoptionManager],
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

    adoptionManager = module.get<AdoptionManager>(AdoptionManager);
    dataSource = module.get<DataSource>(DataSourceImpl);

    seedingResult = await SeederTool.seed(dataSource, true, false);
  });

  it('Can give a cat to adoption', async () => {
    const cat = seedingResult.cats[0];
    const client = seedingResult.clients[0];
    const dto = new AdoptCatDto();
    dto.clientId = client.id;

    const response = await adoptionManager.adoptCat(cat.id, dto);

    expect(response).toBeInstanceOf(AdoptionView);
  });
});
