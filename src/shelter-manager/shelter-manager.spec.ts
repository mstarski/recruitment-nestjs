import { Test } from '@nestjs/testing';
import { ShelterManager } from './shelter-manager';
import { CatFixtureFactory } from '../models/cat/cat.fixture';
import { ClientFixtureFactory } from '../models/client/client.fixture';
import { ShelterFixtureFactory } from '../models/shelter/shelter.fixture';
import { Adoption } from '../domain/adoption';
import { Registration } from '../domain/registration';
import { ShelterSearchResultDto } from '../dto/shelter-search-result.dto';
import {
  CatRepositoryImpl,
  ClientRepositoryImpl,
  ShelterRepositoryImpl,
} from '../models/model.types';
import { createMock } from '@golevelup/ts-jest';
import { CatRepository } from '../models/cat/cat.repository';
import { ShelterRepository } from '../models/shelter/shelter.repository';
import { ClientRepository } from '../models/client/client.repository';

describe('Shelter management', () => {
  let shelterManager: ShelterManager;

  const catFixtureFactory = new CatFixtureFactory();
  const clientFixtureFactory = new ClientFixtureFactory();
  const shelterFixtureFactory = new ShelterFixtureFactory();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ShelterManager,
        {
          provide: CatRepositoryImpl,
          useValue: createMock<CatRepository>(),
        },
        {
          provide: ShelterRepositoryImpl,
          useValue: createMock<ShelterRepository>(),
        },
        {
          provide: ClientRepositoryImpl,
          useValue: createMock<ClientRepository>(),
        },
      ],
    }).compile();

    shelterManager = module.get<ShelterManager>(ShelterManager);
  });

  it('Can register a new Cat', async () => {
    // Arrange
    const catCandidate = catFixtureFactory.generateDraft();
    const shelter = shelterFixtureFactory.generate();

    // Act
    const response = await shelterManager.register(catCandidate, shelter.id);

    // Assert
    expect(response).toBeInstanceOf(Registration);
  });

  it('Can give a cat to adoption', async () => {
    const cat = catFixtureFactory.generate();
    const client = clientFixtureFactory.generate();

    const response = await shelterManager.adopt(cat.id, client.id);

    expect(response).toBeInstanceOf(Adoption);
  });

  it(`Can get shelter's cats in paginated manner`, async () => {
    const response = null;
    expect(response).toBeInstanceOf(ShelterSearchResultDto);
  });
});
