import { faker } from '@faker-js/faker';
import { FixtureFactory } from '../fixture';
import { Shelter } from './shelter.model';
import { DeepPartial } from 'typeorm';
import { ShelterEntity } from '../../database/entities/shelter.entity';

export class ShelterFixtureFactory implements FixtureFactory<Shelter> {
  generate(name?: string): Shelter {
    return new Shelter({
      id: faker.datatype.uuid(),
      name: name ?? faker.company + ' Shelter',
      address: faker.address.streetAddress(false),
    });
  }

  generateDraft(name?: string): DeepPartial<ShelterEntity> {
    return {
      name: name ?? faker.company.name() + ' Shelter',
      address: faker.address.streetAddress(false),
    };
  }
}
