import { Inject, Injectable } from '@nestjs/common';
import { FetchCatsDto } from '../dto/fetch-cats.dto';
import { PaginatedModels } from '../infra/infra.types';
import { CatView } from '../views/cat.view';
import { FetchSheltersDto } from '../dto/fetch-shelters.dto';
import { FetchClientsDto } from '../dto/fetch-clients.dto';
import {
  AdoptionRepositoryImpl,
  CatRepositoryImpl,
  ClientRepositoryImpl,
  RegistrationRepositoryImpl,
  ShelterRepositoryImpl,
} from '../models/model.types';
import { CatRepository } from '../models/cat/cat.repository';
import { ShelterRepository } from '../models/shelter/shelter.repository';
import { ClientRepository } from '../models/client/client.repository';
import { ShelterEntity } from '../database/entities/shelter.entity';
import { FetchAdoptionsDto } from '../dto/fetch-adoptions.dto';
import { AdoptionRepository } from '../models/adoption/adoption.repository';
import { RegistrationRepository } from '../models/registration/registration.repository';
import { FetchRegistrationsDto } from '../dto/fetch-registrations.dto';

@Injectable()
export class ShelterExplorer {
  constructor(
    @Inject(CatRepositoryImpl)
    private readonly catRepository: CatRepository,

    @Inject(ShelterRepositoryImpl)
    private readonly shelterRepository: ShelterRepository,

    @Inject(ClientRepositoryImpl)
    private readonly clientRepository: ClientRepository,

    @Inject(AdoptionRepositoryImpl)
    private readonly adoptionRepository: AdoptionRepository,

    @Inject(RegistrationRepositoryImpl)
    private readonly registrationRepository: RegistrationRepository,
  ) {}

  async fetchCats(dto: FetchCatsDto): Promise<PaginatedModels<CatView>> {
    return this.catRepository.findPaginated(
      dto.page,
      dto.limit,
      dto.name,
      dto.shelterId,
    );
  }

  async fetchShelters(
    dto: FetchSheltersDto,
  ): Promise<PaginatedModels<ShelterEntity>> {
    return this.shelterRepository.findPaginated(dto.page, dto.limit, dto.name);
  }

  async fetchClients(dto: FetchClientsDto) {
    return this.clientRepository.findPaginated(
      dto.page,
      dto.limit,
      dto.surname,
      dto.id,
    );
  }

  async fetchAdoptions(dto: FetchAdoptionsDto) {
    return this.adoptionRepository.findPaginated(dto);
  }

  async fetchRegistrations(dto: FetchRegistrationsDto) {
    return this.registrationRepository.findPaginated(dto);
  }
}
