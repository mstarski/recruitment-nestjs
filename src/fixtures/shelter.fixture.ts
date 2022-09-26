import { faker } from '@faker-js/faker';
import { FixtureFactory } from './fixture';
import { ShelterEntity } from '../database/entities/shelter.entity';

export class ShelterFixtureFactory implements FixtureFactory<ShelterEntity> {
  generate(name?: string): ShelterEntity {
    return new ShelterEntity({
      name: name ?? faker.company.name() + ' Shelter',
      address: faker.address.streetAddress(false),
    });
  }
}
