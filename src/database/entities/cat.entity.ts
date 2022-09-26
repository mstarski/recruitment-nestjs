import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ShelterEntity } from './shelter.entity';
import { ClientEntity } from './client.entity';

@Entity()
export class CatEntity extends BaseEntity {
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

  @Column({ type: 'datetime', nullable: true })
  adoptionDate: Date;

  constructor(props: Partial<CatEntity>) {
    super(props);
  }
}
