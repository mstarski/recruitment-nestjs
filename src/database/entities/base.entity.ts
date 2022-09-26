import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  protected constructor(props: Partial<BaseEntity>) {
    Object.assign(this, props);
  }
}
