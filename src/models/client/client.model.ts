import { ReadModel } from '../read-model';
import { IsInstance, IsInt, IsString, IsUUID, Min } from 'class-validator';
import { Sex } from '../../domain/sex';
import { ClientEntity } from '../../database/entities/client.entity';

export class Client extends ReadModel<ClientEntity> {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsInt()
  @Min(18)
  age: number;

  @IsInstance(Sex)
  sex: Sex;

  constructor(props: Partial<Client>) {
    super(props);
  }

  toEntity() {
    return new ClientEntity({
      id: this.id,
      name: this.name,
      surname: this.surname,
      age: this.age,
      sex: this.sex.toBinary(),
    });
  }
}
