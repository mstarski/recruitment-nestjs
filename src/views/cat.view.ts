import { Sex } from '../value-objects/sex';
import { CatEntity } from '../database/entities/cat.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CatView {
  @ApiProperty({ example: 123 })
  public readonly id: number;

  @ApiProperty({ example: 'Mike' })
  public readonly name: string;

  @ApiProperty({ example: 'Sphinx' })
  public readonly breed: string;

  @ApiProperty({ example: 'male' })
  public readonly sex: string;

  @ApiProperty({ example: false })
  public readonly isAdopted: boolean;

  constructor(entity: CatEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.breed = entity.breed;
    this.sex = new Sex(entity.sex).value;
    this.isAdopted = Boolean(entity.isAdopted);
  }
}
