import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../database.module';
import { DatabaseMode, DataSourceImpl } from '../database.types';
import { ConfigService } from '@nestjs/config';
import { createMock } from '@golevelup/ts-jest';
import { DataSource, QueryFailedError } from 'typeorm';
import { SeederTool, SeedingResult } from '../../tools/seeder.tool';
import { CatFixtureFactory } from '../../fixtures/cat.fixture';
import { CatEntity } from './cat.entity';

describe('DB Entities properties', () => {
  let dataSource: DataSource;
  let seedingResult: SeedingResult;

  const catFixtureFactory = new CatFixtureFactory();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule.forRootAsync({ mode: DatabaseMode.UnitTest })],
      providers: [],
    })
      .useMocker((token) => {
        if (token === ConfigService) {
          return createMock<ConfigService>();
        }
      })
      .compile();

    dataSource = module.get<DataSource>(DataSourceImpl);
    seedingResult = await SeederTool.seed(dataSource, true, false);
  });

  describe('Cat Entity', () => {
    // TODO: Failing test case #2
    it(`should have 'age' property`, () => {
      const cat = seedingResult.cats[0];

      expect(cat.hasOwnProperty('age')).toBeTruthy();
    });

    // TODO: Failing test case #3
    it(`if age is not known it should be set to NULL`, async () => {
      const newCat = catFixtureFactory.generate();

      const entity = await dataSource.getRepository(CatEntity).save(newCat);

      expect(entity['age']).toBe(null);
    });

    // TODO: Failing test case #4
    it(`should have unique pair of name/breed properties`, async () => {
      const catRepo = dataSource.getRepository(CatEntity);
      const existingCat = seedingResult.cats[0];
      const newCat = catRepo.create({
        name: existingCat.name,
        breed: existingCat.breed,
        sex: 0,
      });

      const response = catRepo.save(newCat);

      await expect(response).rejects.toThrow(
        new QueryFailedError(
          undefined,
          undefined,
          'SQLITE_CONSTRAINT: UNIQUE constraint failed: cat_entity.name, cat_entity.breed',
        ),
      );
    });
  });
});
