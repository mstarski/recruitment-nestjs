import { AdoptionView } from '../../views/adoption.view';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../database/database.module';
import { DatabaseMode, DataSourceImpl } from '../../database/database.types';
import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { AdoptionManager } from './adoption-manager';
import { SeederTool, SeedingResult } from '../../tools/seeder.tool';
import { DataSource } from 'typeorm';
import { AdoptCatDto } from '../../dto/adopt-cat.dto';
import { ClientFixtureFactory } from '../../fixtures/client.fixture';
import { ClientEntity } from '../../database/entities/client.entity';

describe('Adoption Manager', () => {
  let adoptionManager: AdoptionManager;
  let dataSource: DataSource;

  let seedingResult: SeedingResult;

  const clientFixtureFactory = new ClientFixtureFactory();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule.forRootAsync({ mode: DatabaseMode.UnitTest })],
      providers: [AdoptionManager],
    })
      .useMocker((token) => {
        if (token === ConfigService) {
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

  // TODO: Failing test case #1
  it(`Doesn't allow adoption for clients under 18 years old`, async () => {
    const underageClient = await dataSource
      .getRepository(ClientEntity)
      .save(clientFixtureFactory.generate(16));
    const cat = seedingResult.cats[0];
    const dto = new AdoptCatDto();
    dto.clientId = underageClient.id;

    const response = () => adoptionManager.adoptCat(cat.id, dto);

    await expect(response()).rejects.toThrow(
      `${underageClient.name} cannot adopt a cat because they're under 18.`,
    );
  });
});
