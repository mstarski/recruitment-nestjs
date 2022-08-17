import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ShelterEntity } from './shelter.entity';
import { Cat } from '../../models/cat/cat.model';
import { Sex } from '../../domain/sex';
import { ClientEntity } from './client.entity';

@Entity()
export class CatEntity extends BaseEntity<Cat> {
  @Column()
  name: string;

  @Column({ default: 'stray' })
  breed: string;

  @Column({ type: 'int2' })
  sex: number;

  @Column({ type: 'int2', default: false })
  isAdopted: number;

  @ManyToOne(() => ShelterEntity, (shelter) => shelter.cats, { lazy: true })
  shelter: Promise<ShelterEntity>;

  @ManyToOne(() => ClientEntity, (client) => client.adoptedCats, { lazy: true })
  adoptedBy: Promise<ClientEntity>;

  constructor(props: Partial<CatEntity>) {
    super(props);
  }

  toModel(): Cat {
    const adoptionClient = this.adoptedBy.then((entity) => entity.toModel());

    return new Cat({
      id: this.id,
      name: this.name,
      breed: this.breed,
      sex: new Sex(this.sex),
      isAdopted: !!this.isAdopted,
      adoptedBy: adoptionClient,
    });
  }
}
