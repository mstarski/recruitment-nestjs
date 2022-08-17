import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity<Model> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  protected constructor(props: Partial<BaseEntity<Model>>) {
    Object.assign(this, props);
  }

  abstract toModel(): Model;
}
