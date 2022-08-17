import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CatEntity } from './cat.entity';
import { Shelter } from '../../models/shelter/shelter.model';

@Entity()
export class ShelterEntity extends BaseEntity<Shelter> {
  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => CatEntity, (cat) => cat.shelter, { lazy: true })
  cats: Promise<CatEntity[]>;

  constructor(props: Partial<ShelterEntity>) {
    super(props);
  }

  toModel() {
    return new Shelter({
      id: this.id,
      name: this.name,
      address: this.address,
    });
  }
}
