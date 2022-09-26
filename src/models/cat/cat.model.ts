import {
  IsBoolean,
  IsInstance,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ReadModel } from '../read-model';
import { Sex } from '../../domain/sex';
import { CatEntity } from '../../database/entities/cat.entity';
import { Client } from '../client/client.model';

export class Cat extends ReadModel<CatEntity> {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  breed: string;

  @IsInstance(Sex)
  sex: Sex;

  @IsBoolean()
  isAdopted: boolean;

  @IsInstance(Promise<Client>)
  @IsOptional()
  adoptedBy?: Promise<Client>;

  constructor(props: Partial<Cat>) {
    super(props);
  }

  toEntity(): CatEntity {
    return new CatEntity({
      id: this.id,
      name: this.name,
      breed: this.breed,
      sex: this.sex.toBinary(),
      isAdopted: Number(this.isAdopted),
    });
  }
}
