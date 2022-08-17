import { BaseEntity } from 'src/database/entities/base.entity';
import {
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { ReadModel } from '../models/read-model';
import { CatEntity } from '../database/entities/cat.entity';
import { PaginatedSearchRequest } from './paginated-models-request';

export abstract class AppRepository<
  Entity extends BaseEntity<Model>,
  Model extends ReadModel<Entity>,
> {
  protected constructor(protected readonly dbRepo: Repository<Entity>) {}

  async findOneOrFail(options?: FindManyOptions<Entity>): Promise<Model> {
    const entity = await this.dbRepo.findOneOrFail(options);
    return entity.toModel();
  }

  async findOne(options?: FindManyOptions<Entity>): Promise<Model> {
    const entity = await this.dbRepo.findOne(options);
    return entity.toModel();
  }

  async find(options?: FindOneOptions<Entity>): Promise<Model[]> {
    const entities = await this.dbRepo.find(options);
    return entities.map((e) => e.toModel());
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
