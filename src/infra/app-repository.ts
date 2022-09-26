import {
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { CatEntity } from '../database/entities/cat.entity';
import { PaginatedSearchRequest } from './paginated-models-request';

export abstract class AppRepository<Entity> {
  protected constructor(protected readonly dbRepo: Repository<Entity>) {}

  async findOneOrFail(options?: FindManyOptions<Entity>): Promise<Entity> {
    return this.dbRepo.findOneOrFail(options);
  }

  async find(options?: FindOneOptions<Entity>): Promise<Entity[]> {
    return await this.dbRepo.find(options);
  }

  protected resolveManager(entityManager?: EntityManager) {
    return entityManager ? entityManager.getRepository(CatEntity) : this.dbRepo;
  }

  protected generatePaginatedQb(
    req: PaginatedSearchRequest,
    alias = 'entity',
  ): SelectQueryBuilder<Entity> {
    return this.dbRepo.createQueryBuilder(alias).take(req.take).skip(req.skip);
  }
}
