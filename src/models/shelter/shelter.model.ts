import { IsNumber, IsString } from 'class-validator';
import { ReadModel } from '../read-model';
import { ShelterEntity } from '../../database/entities/shelter.entity';

export class Shelter extends ReadModel<ShelterEntity> {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  address: string;

  constructor(props: Partial<Shelter>) {
    super(props);
  }

  toEntity() {
    return new ShelterEntity({
      id: this.id,
      name: this.name,
      address: this.address,
    });
  }
}
