import { FixtureFactory } from '../fixture';
import { Client } from './client.model';
import { faker } from '@faker-js/faker';
import { Sex } from '../../domain/sex';
import { DeepPartial } from 'typeorm';
import { ClientEntity } from '../../database/entities/client.entity';

export class ClientFixtureFactory implements FixtureFactory<Client> {
  generate(): Client {
    const sex = Sex.getRandom();

    return new Client({
      id: faker.datatype.uuid(),
      name: faker.name.firstName(sex.value),
      surname: faker.name.lastName(sex.value),
      age: faker.datatype.number({ min: 18 }),
      sex: sex,
    });
  }

  generateDraft(): DeepPartial<ClientEntity> {
    const sex = Sex.getRandom();

    return {
      name: faker.name.firstName(sex.value),
      surname: faker.name.lastName(sex.value),
      age: faker.datatype.number({ min: 18 }),
      sex: sex.toBinary(),
    };
  }
}
