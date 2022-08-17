import { Inject, Injectable } from '@nestjs/common';
import { Cat } from '../models/cat/cat.model';
import {
  CatRepositoryImpl,
  ClientRepositoryImpl,
  ShelterRepositoryImpl,
} from '../models/model.types';
import { CatRepository } from '../models/cat/cat.repository';
import { ShelterRepository } from '../models/shelter/shelter.repository';
import { ClientRepository } from '../models/client/client.repository';
import { DataSource, DeepPartial } from 'typeorm';
import { CatEntity } from '../database/entities/cat.entity';
import { DataSourceImpl } from '../database/database.types';
import { Registration } from '../domain/registration';
import { Adoption } from '../domain/adoption';
import { FetchCatsDto } from '../dto/fetch-cats.dto';
import { PaginatedModels } from '../infra/infra.types';
import { Shelter } from '../models/shelter/shelter.model';
import { FetchSheltersDto } from '../dto/fetch-shelters.dto';

@Injectable()
export class ShelterManager {
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

  async register(
    catCandidate: DeepPartial<CatEntity>,
    shelterId: string,
  ): Promise<Registration> {
    let registration: Registration;

    await this.dataSource.manager.transaction(async (entityManager) => {
      const shelter = await this.shelterRepository.findOneOrFail({
        where: { id: shelterId },
      });

      const cat = await this.catRepository.create(
        catCandidate,
        shelter,
        entityManager,
      );

      registration = new Registration(cat, shelter);
    });

    return registration;
  }

  async adopt(catId: string, clientId: string) {
    let adoption: Adoption;

    await this.dataSource.manager.transaction(async (entityManager) => {
      const client = await this.clientRepository.findOneOrFail({
        where: { id: clientId },
      });

      const cat = await this.catRepository.findOneOrFail({
        where: { id: catId },
      });

      const adoptedCat = cat.setAdoption(client);
      const result = await this.catRepository.update(adoptedCat, entityManager);

      adoption = new Adoption(result, client);
    });

    return adoption;
  }

  async fetchCats(dto: FetchCatsDto): Promise<PaginatedModels<Cat>> {
    return this.catRepository.findPaginated(
      dto.page,
      dto.limit,
      dto.name,
      dto.shelterId,
    );
  }

  async fetchShelters(
    dto: FetchSheltersDto,
  ): Promise<PaginatedModels<Shelter>> {
    return this.shelterRepository.findPaginated(dto.page, dto.limit, dto.name);
  }
}
