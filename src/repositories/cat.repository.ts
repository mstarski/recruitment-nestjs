import { DbRepository } from '../infra/db-repository';
import { CatEntity } from '../database/entities/cat.entity';

import { DeepPartial, EntityManager, Repository } from 'typeorm';

import { PaginatedSearchRequest } from '../infra/paginated-models-request';
import { PaginatedModels } from '../infra/infra.types';
import { CatView } from '../views/cat.view';
import { ClientEntity } from '../database/entities/client.entity';
import { AdoptionView } from '../views/adoption.view';
import { ShelterEntity } from '../database/entities/shelter.entity';

export class CatRepository extends DbRepository<CatEntity> {
  constructor(protected readonly dbRepo: Repository<CatEntity>) {
    super(dbRepo);
  }

  async create(
    body: DeepPartial<CatEntity>,
    shelter: ShelterEntity,
    entityManager?: EntityManager,
  ): Promise<CatEntity> {
    const manager = this.resolveManager(entityManager);

    const entity = manager.create(body);
    entity.shelter = Promise.resolve(shelter);

    return await manager.save(entity);
  }

  async update(
    cat: CatEntity,
    entityManager?: EntityManager,
  ): Promise<CatEntity> {
    const manager = this.resolveManager(entityManager);
    return await manager.save(cat);
  }

  async setAdoption(
    cat: CatEntity,
    client: ClientEntity,
    entityManager?: EntityManager,
  ): Promise<AdoptionView> {
    const manager = this.resolveManager(entityManager);

    cat.adoptedBy = Promise.resolve(client);
    cat.adoptionDate = new Date();
    cat.isAdopted = 1;

    const adoptedCat = await manager.save(cat);

    return new AdoptionView(adoptedCat, client);
  }

  async findPaginated(
    page: number,
    limit: number,
    name?: string,
    shelterId?: string,
  ): Promise<PaginatedModels<CatView>> {
    const searchPattern = name ? `%${name}%` : `%%`;

    let qb = this.generatePaginatedQb(
      new PaginatedSearchRequest(page, limit),
      'cat',
    )
      .leftJoinAndSelect('cat.shelter', 'shelter')
      .where(`cat."name" LIKE :searchPattern`, { searchPattern });

    if (shelterId) {
      qb = qb.andWhere(`shelter.id = :shelterId`, { shelterId });
    }

    const [entities, total] = await qb.getManyAndCount();
    const result = entities.map((e) => new CatView(e));

    return { total, result };
  }
}
