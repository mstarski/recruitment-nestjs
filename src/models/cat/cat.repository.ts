import { AppRepository } from '../../infra/app-repository';
import { CatEntity } from '../../database/entities/cat.entity';
import { Cat } from './cat.model';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { Shelter } from '../shelter/shelter.model';
import { PaginatedSearchRequest } from '../../infra/paginated-models-request';
import { PaginatedModels } from '../../infra/infra.types';
import { CatView } from '../../views/cat.view';
import { ClientEntity } from '../../database/entities/client.entity';
import { Adoption } from '../../domain/adoption';

export class CatRepository extends AppRepository<CatEntity, Cat> {
  constructor(protected readonly dbRepo: Repository<CatEntity>) {
    super(dbRepo);
  }

  async create(
    body: DeepPartial<CatEntity>,
    shelter: Shelter,
    entityManager?: EntityManager,
  ): Promise<Cat> {
    const manager = this.resolveManager(entityManager);

    const entity = manager.create(body);
    entity.shelter = Promise.resolve(shelter.toEntity());

    const result = await manager.save(entity);
    return result.toModel();
  }

  async update(cat: Cat, entityManager?: EntityManager): Promise<Cat> {
    const manager = this.resolveManager(entityManager);

    const entity = await manager.save(cat.toEntity());
    return entity.toModel();
  }

  async setAdoption(
    cat: CatEntity,
    client: ClientEntity,
    entityManager?: EntityManager,
  ): Promise<Adoption> {
    const manager = this.resolveManager(entityManager);

    cat.adoptedBy = Promise.resolve(client);
    const adoptedCat = await manager.save(cat);

    return new Adoption(adoptedCat.toModel(), client.toModel());
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
