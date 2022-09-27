import { ClientEntity } from '../database/entities/client.entity';
import { Sex } from '../value-objects/sex';
import { ApiProperty } from '@nestjs/swagger';

export class ClientView {
  @ApiProperty({ example: 'Max' })
  readonly name: string;

  @ApiProperty({ example: 'Smith' })
  readonly surname: string;

  @ApiProperty({ example: '28' })
  readonly age: number;

  @ApiProperty({ example: 1, description: '0 = female, 1 = male' })
  readonly sex: string;

  constructor(entity: ClientEntity) {
    this.name = entity.name;
    this.surname = entity.surname;
    this.age = entity.age;
    this.sex = new Sex(entity.sex).value;
  }
}
