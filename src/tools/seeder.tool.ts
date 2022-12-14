import { Tool } from './tool';
import { DataSource } from 'typeorm';
import { ShelterEntity } from '../database/entities/shelter.entity';
import { ShelterFixtureFactory } from '../fixtures/shelter.fixture';
import { CatEntity } from '../database/entities/cat.entity';
import { CatFixtureFactory } from '../fixtures/cat.fixture';
import { ClientFixtureFactory } from '../fixtures/client.fixture';
import { ClientEntity } from '../database/entities/client.entity';

export interface SeedingResult {
  shelters: ShelterEntity[];
  cats: CatEntity[];
  clients: ClientEntity[];
}

export class SeederTool extends Tool {
  static async seed(
    dataSource: DataSource,
    onEmpty = true,
    log = true,
  ): Promise<SeedingResult> {
    const shelterRepo = dataSource.getRepository(ShelterEntity);
    const catRepo = dataSource.getRepository(CatEntity);
    const clientRepo = dataSource.getRepository(ClientEntity);

    const seededShelters = [];
    const seededCats = [];
    const seededClients = [];

    if (onEmpty) {
      const shelterCount = await shelterRepo.count();

      if (shelterCount > 0) return;
    }

    const shelterFixtureFactory = new ShelterFixtureFactory();
    const catFixtureFactory = new CatFixtureFactory();
    const clientFixtureFactory = new ClientFixtureFactory();

    if (log) console.log('Seeding db 🌱...');

    const shelter = await shelterRepo.save(
      shelterFixtureFactory.generate('Sample'),
    );
    seededShelters.push(shelter);

    for (let i = 0; i < 20; i++) {
      const catCandidate = catFixtureFactory.generate();

      catCandidate.shelter = Promise.resolve(shelter);

      const savedCat = await catRepo.save(catCandidate);
      seededCats.push(savedCat);

      const clientCandidate = clientFixtureFactory.generate();

      const savedClient = await clientRepo.save(clientCandidate);
      seededClients.push(savedClient);
    }

    if (log) console.log('Seeding has been completed ✅');

    return {
      shelters: seededShelters,
      clients: seededClients,
      cats: seededCats,
    };
  }
}
