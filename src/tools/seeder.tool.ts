import { Tool } from './tool';
import { DataSource } from 'typeorm';
import { ShelterEntity } from '../database/entities/shelter.entity';
import { ShelterFixtureFactory } from '../models/shelter/shelter.fixture';
import { CatEntity } from '../database/entities/cat.entity';
import { CatFixtureFactory } from '../models/cat/cat.fixture';
import { ClientFixtureFactory } from '../models/client/client.fixture';
import { ClientEntity } from '../database/entities/client.entity';

export class SeederTool extends Tool {
  static async seed(dataSource: DataSource, onEmpty = true): Promise<void> {
    const shelterRepo = dataSource.getRepository(ShelterEntity);
    const catRepo = dataSource.getRepository(CatEntity);
    const clientRepo = dataSource.getRepository(ClientEntity);

    if (onEmpty) {
      const shelterCount = await shelterRepo.count();

      if (shelterCount > 0) return;
    }

    const shelterFixtureFactory = new ShelterFixtureFactory();
    const catFixtureFactory = new CatFixtureFactory();
    const clientFixtureFactory = new ClientFixtureFactory();

    console.log('Seeding db 🌱...');

    const shelter = await shelterRepo.save(
      shelterFixtureFactory.generateDraft(),
    );

    for (let i = 0; i < 20; i++) {
      const catCandidate = catFixtureFactory.generateDraft();
      const cat = catRepo.create(catCandidate);
      cat.shelter = Promise.resolve(shelter);
      await catRepo.save(cat);

      const clientCandidate = clientFixtureFactory.generateDraft();
      await clientRepo.save(clientCandidate);
    }

    console.log('Seeding has been completed ✅');
  }
}
