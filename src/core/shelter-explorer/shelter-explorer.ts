import { Inject, Injectable } from '@nestjs/common';
import { FetchCatsDto } from '../../dto/fetch-cats.dto';
import { PaginatedList } from '../../infra/infra.types';
import { CatView } from '../../views/cat.view';
import { FetchSheltersDto } from '../../dto/fetch-shelters.dto';
import { FetchClientsDto } from '../../dto/fetch-clients.dto';
import {
  AdoptionRepositoryImpl,
  CatRepositoryImpl,
  ClientRepositoryImpl,
  RegistrationRepositoryImpl,
  ShelterRepositoryImpl,
} from '../../repositories/repository.token';
import { CatRepository } from '../../repositories/cat.repository';
import { ShelterRepository } from '../../repositories/shelter.repository';
import { ClientRepository } from '../../repositories/client.repository';
import { FetchAdoptionsDto } from '../../dto/fetch-adoptions.dto';
import { AdoptionRepository } from '../../repositories/adoption.repository';
import { RegistrationRepository } from '../../repositories/registration.repository';
import { FetchRegistrationsDto } from '../../dto/fetch-registrations.dto';
import { ShelterView } from '../../views/shelter.view';

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

  async fetchCats(dto: FetchCatsDto): Promise<PaginatedList<CatView>> {
    return this.catRepository.findPaginated(
      dto.page,
      dto.limit,
      dto.name,
      dto.shelterId,
    );
  }

  async fetchShelters(
    dto: FetchSheltersDto,
  ): Promise<PaginatedList<ShelterView>> {
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
