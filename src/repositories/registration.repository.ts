import { DataSource, FindManyOptions } from 'typeorm';
import { Inject } from '@nestjs/common';
import { DataSourceImpl } from '../database/database.types';
import { PaginatedList } from '../infra/infra.types';
import { RegistrationView } from '../views/registration.view';
import { FetchRegistrationsDto } from '../dto/fetch-registrations.dto';
import { CatEntity } from '../database/entities/cat.entity';
import { PaginatedSearchRequest } from '../infra/paginated-search-request';

export class RegistrationRepository {
  constructor(
    @Inject(DataSourceImpl) private readonly dataSource: DataSource,
  ) {}

  async findPaginated(
    dto: FetchRegistrationsDto,
  ): Promise<PaginatedList<RegistrationView>> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const searchRequest = new PaginatedSearchRequest(dto.page, dto.limit);

    const options: FindManyOptions<CatEntity> = {
      where: {},
      relations: ['shelter'],
      take: searchRequest.take,
      skip: searchRequest.skip,
    };

    if (dto?.catId) {
      options.where = {
        ...options.where,
        id: dto.catId,
      };
    }

    if (dto?.shelterId) {
      options.where = {
        ...options.where,
        shelter: { id: dto.shelterId },
      };
    }

    const [matchingCats, total] = await queryRunner.manager.findAndCount(
      CatEntity,
      options,
    );

    const registrations = await Promise.all(
      matchingCats.map(async (cat) => {
        const inhabitedShelter = await cat.shelter;
        return new RegistrationView(cat, inhabitedShelter);
      }),
    );

    return new PaginatedList<RegistrationView>(total, registrations, dto.page);
  }
}
