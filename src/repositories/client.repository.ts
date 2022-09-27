import { DbRepository } from '../infra/db-repository';
import { Repository } from 'typeorm';
import { ClientEntity } from '../database/entities/client.entity';
import { PaginatedList } from '../infra/infra.types';
import { PaginatedSearchRequest } from '../infra/paginated-models-request';
import { ClientView } from '../views/client.view';

export class ClientRepository extends DbRepository<ClientEntity> {
  constructor(protected readonly dbRepo: Repository<ClientEntity>) {
    super(dbRepo);
  }

  async findPaginated(
    page: number,
    limit: number,
    surname?: string,
    id?: number,
  ): Promise<PaginatedList<ClientView>> {
    const searchPattern = surname ? `%${surname}%` : `%%`;

    let qb = this.generatePaginatedQb(
      new PaginatedSearchRequest(page, limit),
      'client',
    ).where(`client."surname" LIKE :searchPattern`, { searchPattern });

    // Ids start from 1 so we don't have to care about id = 0
    if (id) {
      qb = qb.andWhere(`client."id" = :id`, { id });
    }

    const [entities, total] = await qb.getManyAndCount();
    const result = entities.map((e) => new ClientView(e));

    return new PaginatedList<ClientView>(total, result);
  }
}
