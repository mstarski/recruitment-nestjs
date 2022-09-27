import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../database/database.module';
import { DatabaseMode, DataSourceImpl } from '../../database/database.types';
import { DataSource } from 'typeorm';
import { SeederTool, SeedingResult } from '../../tools/seeder.tool';
import { ShelterExplorer } from './shelter-explorer';
import { PaginatedList } from '../../infra/infra.types';
import { CatView } from '../../views/cat.view';
import { ShelterEntity } from '../../database/entities/shelter.entity';
import { ClientView } from '../../views/client.view';
import { AdoptionView } from '../../views/adoption.view';
import { RegistrationView } from '../../views/registration.view';
import { ConfigService } from '@nestjs/config';
import { createMock } from '@golevelup/ts-jest';
import { FetchCatsDto } from '../../dto/fetch-cats.dto';
import { FetchSheltersDto } from '../../dto/fetch-shelters.dto';
import { FetchClientsDto } from '../../dto/fetch-clients.dto';
import { FetchAdoptionsDto } from '../../dto/fetch-adoptions.dto';
import { FetchRegistrationsDto } from '../../dto/fetch-registrations.dto';

describe('Shelter Explorer', () => {
  let shelterExplorer: ShelterExplorer;
  let dataSource: DataSource;

  let seedingResult: SeedingResult;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule.forRootAsync({ mode: DatabaseMode.UnitTest })],
      providers: [ShelterExplorer],
    })
      .useMocker((token) => {
        if (token === ConfigService) {
          return createMock<ConfigService>();
        }
      })
      .compile();

    shelterExplorer = module.get<ShelterExplorer>(ShelterExplorer);
    dataSource = module.get<DataSource>(DataSourceImpl);

    seedingResult = await SeederTool.seed(dataSource, true, false);
  });

  it(`Can get cats in paginated manner`, async () => {
    const dto = new FetchCatsDto();
    dto.shelterId = seedingResult.shelters[0].id;

    const response = await shelterExplorer.fetchCats(dto);

    expect(response).toBeInstanceOf(PaginatedList<CatView>);
  });

  it(`Can get shelters in paginated manner`, async () => {
    const dto = new FetchSheltersDto();

    const response = await shelterExplorer.fetchShelters(dto);

    expect(response).toBeInstanceOf(PaginatedList<ShelterEntity>);
  });

  it(`Can get clients in paginated manner`, async () => {
    const dto = new FetchClientsDto();

    const response = await shelterExplorer.fetchClients(dto);

    expect(response).toBeInstanceOf(PaginatedList<ClientView>);
  });

  it(`Can get adoptions in paginated manner`, async () => {
    const dto = new FetchAdoptionsDto();

    const response = await shelterExplorer.fetchAdoptions(dto);

    expect(response).toBeInstanceOf(PaginatedList<AdoptionView>);
  });

  it(`Can get registrations cats in paginated manner`, async () => {
    const dto = new FetchRegistrationsDto();

    const response = await shelterExplorer.fetchRegistrations(dto);

    expect(response).toBeInstanceOf(PaginatedList<RegistrationView>);
  });
});
