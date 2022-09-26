import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CatEntity } from './cat.entity';

@Entity()
export class ShelterEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => CatEntity, (cat) => cat.shelter, { lazy: true })
  cats: Promise<CatEntity[]>;

  constructor(props: Partial<ShelterEntity>) {
    super(props);
  }
}
