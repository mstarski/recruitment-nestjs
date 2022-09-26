import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CatEntity } from './cat.entity';

@Entity()
export class ClientEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ type: 'int8' })
  age: number;

  @Column({ type: 'int2' })
  sex: number;

  @OneToMany(() => CatEntity, (cat) => cat.adoptedBy, { lazy: true })
  adoptedCats: Promise<CatEntity[]>;

  constructor(props: Partial<ClientEntity>) {
    super(props);
  }
}
