import {
  DataSource,
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';
import { Inject } from '@nestjs/common';
import { DataSourceImpl } from '../database/database.types';
import { PaginatedModels } from '../infra/infra.types';
import { AdoptionView } from '../views/adoption.view';
import { CatEntity } from '../database/entities/cat.entity';
import { FetchAdoptionsDto } from '../dto/fetch-adoptions.dto';
import { PaginatedSearchRequest } from '../infra/paginated-models-request';

export class AdoptionRepository {
  constructor(
    @Inject(DataSourceImpl) private readonly dataSource: DataSource,
  ) {}

  async findPaginated(
    dto: FetchAdoptionsDto,
  ): Promise<PaginatedModels<AdoptionView>> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const searchRequest = new PaginatedSearchRequest(dto.page, dto.limit);

    const options: FindManyOptions<CatEntity> = {
      where: {
        isAdopted: 1,
      },
      relations: ['adoptedBy'],
      take: searchRequest.take,
      skip: searchRequest.skip,
    };

    if (dto?.catId) {
      options.where = {
        ...options.where,
        id: dto.catId,
      };
    }

    if (dto?.clientId) {
      options.where = {
        ...options.where,
        adoptedBy: { id: dto.clientId },
      };
    }

    if (dto?.dateFrom) {
      options.where = {
        ...options.where,
        adoptionDate: MoreThanOrEqual(dto.dateFrom),
      };
    }

    if (dto?.dateTo) {
      options.where = {
        ...options.where,
        adoptionDate: LessThanOrEqual(dto.dateTo),
      };
    }

    const [matchingCats, total] = await queryRunner.manager.findAndCount(
      CatEntity,
      options,
    );

    const adoptions = await Promise.all(
      matchingCats.map(async (cat) => {
        const adoptionClient = await cat.adoptedBy;
        return new AdoptionView(cat, adoptionClient);
      }),
    );

    await queryRunner.release();
    return { total, result: adoptions };
  }
}
