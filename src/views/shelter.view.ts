import { ShelterEntity } from '../database/entities/shelter.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ShelterView {
  @ApiProperty({ example: 123 })
  readonly id: number;

  @ApiProperty({ example: 'Sample Shelter' })
  readonly name: string;

  @ApiProperty({ example: '096 Benton Mews' })
  readonly address: string;

  constructor(entity: ShelterEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.address = entity.address;
  }
}
