import { faker } from '@faker-js/faker';
import { FixtureFactory } from './fixture';
import { Sex } from '../value-objects/sex';
import { CatEntity } from '../database/entities/cat.entity';

export class CatFixtureFactory implements FixtureFactory<CatEntity> {
  generate(age?: number): CatEntity {
    const sex = Sex.getRandom();

    return new CatEntity({
      name: faker.name.firstName(sex.value),
      breed: faker.animal.cat(),
      sex: sex.toBinary(),
    });
  }
}
