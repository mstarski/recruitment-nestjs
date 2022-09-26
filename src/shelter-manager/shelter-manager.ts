import { Inject, Injectable } from '@nestjs/common';
import {
  CatRepositoryImpl,
  ShelterRepositoryImpl,
} from '../models/model.types';
import { CatRepository } from '../models/cat/cat.repository';
import { ShelterRepository } from '../models/shelter/shelter.repository';
import { DataSource } from 'typeorm';
import { DataSourceImpl } from '../database/database.types';
import { Registration } from '../domain/registration';
import { RegisterCatDto } from '../dto/register-cat.dto';
import { CatEntity } from '../database/entities/cat.entity';

@Injectable()
export class ShelterManager {
  constructor(
    @Inject(CatRepositoryImpl)
    private readonly catRepository: CatRepository,

    @Inject(ShelterRepositoryImpl)
    private readonly shelterRepository: ShelterRepository,

    @Inject(DataSourceImpl)
    private readonly dataSource: DataSource,
  ) {}

  async registerCat(
    dto: RegisterCatDto,
    shelterId: number,
  ): Promise<Registration> {
    let registration: Registration;

    const catCandidate: Partial<CatEntity> = {
      name: dto.name,
      breed: dto.breed,
      sex: dto.sex,
    };

    await this.dataSource.manager.transaction(async (entityManager) => {
      const shelter = await this.shelterRepository.findOneOrFail({
        where: { id: shelterId },
      });

      const cat = await this.catRepository.create(
        catCandidate,
        shelter,
        entityManager,
      );

      registration = new Registration(cat, shelter);
    });

    return registration;
  }
}
