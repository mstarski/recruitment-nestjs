import { FixtureFactory } from './fixture';
import { faker } from '@faker-js/faker';
import { Sex } from '../value-objects/sex';
import { ClientEntity } from '../database/entities/client.entity';

export class ClientFixtureFactory implements FixtureFactory<ClientEntity> {
  generate(age?: number): ClientEntity {
    const sex = Sex.getRandom();

    return new ClientEntity({
      name: faker.name.firstName(sex.value),
      surname: faker.name.lastName(sex.value),
      age: age ?? faker.datatype.number({ min: 18, max: 65 }),
      sex: sex.toBinary(),
    });
  }
}
