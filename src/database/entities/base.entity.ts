import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity<Model> {
  @PrimaryGeneratedColumn('increment')
  id: number;

  protected constructor(props: Partial<BaseEntity<Model>>) {
    Object.assign(this, props);
  }

  abstract toModel(): Model;
}
