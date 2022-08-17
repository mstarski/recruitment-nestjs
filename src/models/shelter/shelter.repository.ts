import { AppRepository } from '../../infra/app-repository';
import { Repository } from 'typeorm';
import { ShelterEntity } from '../../database/entities/shelter.entity';
import { Shelter } from './shelter.model';
import { PaginatedModels } from '../../infra/infra.types';
import { PaginatedSearchRequest } from '../../infra/paginated-models-request';

export class ShelterRepository extends AppRepository<ShelterEntity, Shelter> {
  constructor(protected readonly dbRepo: Repository<ShelterEntity>) {
    super(dbRepo);
  }

  async findPaginated(
    page: number,
    limit: number,
    name?: string,
  ): Promise<PaginatedModels<Shelter>> {
    const searchPattern = name ? `%${name}%` : `%%`;

    const qb = this.generatePaginatedQb(
      new PaginatedSearchRequest(page, limit),
      'shelter',
    ).where(`shelter."name" LIKE :searchPattern`, { searchPattern });

    const [entities, total] = await qb.getManyAndCount();
    const result = entities.map((e) => e.toModel());

    return { total, result };
  }
}
