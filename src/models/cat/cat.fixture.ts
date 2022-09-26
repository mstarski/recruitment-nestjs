import { faker } from '@faker-js/faker';
import { FixtureFactory } from '../fixture';
import { Cat } from './cat.model';
import { Sex } from '../../domain/sex';
import { DeepPartial } from 'typeorm';
import { CatEntity } from '../../database/entities/cat.entity';

export class CatFixtureFactory implements FixtureFactory<Cat> {
  generate(): Cat {
    const sex = Sex.getRandom();

    return new Cat({
      id: faker.datatype.number(),
      name: faker.name.firstName(sex.value),
      breed: faker.animal.cat(),
      sex: sex,
      isAdopted: false,
      adoptedBy: null,
    });
  }

  generateDraft(): DeepPartial<CatEntity> {
    const sex = Sex.getRandom();

    return {
      name: faker.name.firstName(sex.value),
      breed: faker.animal.cat(),
      sex: sex.toBinary(),
      isAdopted: Number(false),
      adoptedBy: null,
    };
  }
}
