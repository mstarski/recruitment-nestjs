import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  CatRepositoryImpl,
  ClientRepositoryImpl,
  ShelterRepositoryImpl,
} from '../models/model.types';
import { CatRepository } from '../models/cat/cat.repository';
import { ShelterRepository } from '../models/shelter/shelter.repository';
import { DataSourceImpl } from '../database/database.types';
import { DataSource } from 'typeorm';
import { ClientRepository } from '../models/client/client.repository';
import { AdoptCatDto } from '../dto/adopt-cat.dto';

@Injectable()
export class AdoptionManager {
  constructor(
    @Inject(CatRepositoryImpl)
    private readonly catRepository: CatRepository,

    @Inject(ShelterRepositoryImpl)
    private readonly shelterRepository: ShelterRepository,

    @Inject(ClientRepositoryImpl)
    private readonly clientRepository: ClientRepository,

    @Inject(DataSourceImpl)
    private readonly dataSource: DataSource,
  ) {}

  async adoptCat(catId: number, dto: AdoptCatDto) {
    const { clientId } = dto;

    const cat = await this.catRepository.findOneOrFail({
      where: { id: catId },
    });

    if (cat.isAdopted) {
      throw new ConflictException(
        `${cat.name} has already been adopted by a client`,
      );
    }

    const client = await this.clientRepository.findOneOrFail({
      where: { id: clientId },
    });

    return await this.catRepository.setAdoption(cat, client);
  }
}
