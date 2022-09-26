import { ClientEntity } from '../database/entities/client.entity';
import { Sex } from '../value-objects/sex';

export class ClientView {
  name: string;
  surname: string;
  age: number;
  sex: string;

  constructor(entity: ClientEntity) {
    this.name = entity.name;
    this.surname = entity.surname;
    this.age = entity.age;
    this.sex = new Sex(entity.sex).value;
  }
}
