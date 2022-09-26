import { DbRepository } from '../../infra/db-repository';
import { Repository } from 'typeorm';
import { ShelterEntity } from '../../database/entities/shelter.entity';
import { PaginatedModels } from '../../infra/infra.types';
import { PaginatedSearchRequest } from '../../infra/paginated-models-request';

export class ShelterRepository extends DbRepository<ShelterEntity> {
  constructor(protected readonly dbRepo: Repository<ShelterEntity>) {
    super(dbRepo);
  }

  async findPaginated(
    page: number,
    limit: number,
    name?: string,
  ): Promise<PaginatedModels<ShelterEntity>> {
    const searchPattern = name ? `%${name}%` : `%%`;

    const qb = this.generatePaginatedQb(
      new PaginatedSearchRequest(page, limit),
      'shelter',
    ).where(`shelter."name" LIKE :searchPattern`, { searchPattern });

    const [result, total] = await qb.getManyAndCount();
    return { total, result };
  }
}
