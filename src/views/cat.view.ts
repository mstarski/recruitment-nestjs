import { Sex } from '../domain/sex';
import { CatEntity } from '../database/entities/cat.entity';

export class CatView {
  public readonly id;
  public readonly name: string;
  public readonly breed: string;
  public readonly sex: string;
  public readonly isAdopted: boolean;

  constructor(entity: CatEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.breed = entity.breed;
    this.sex = new Sex(entity.sex).value;
    this.isAdopted = Boolean(entity.isAdopted);
  }
}
