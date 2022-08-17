import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Client } from '../../models/client/client.model';
import { Sex } from '../../domain/sex';
import { CatEntity } from './cat.entity';

@Entity()
export class ClientEntity extends BaseEntity<Client> {
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

  toModel(): Client {
    return new Client({
      id: this.id,
      name: this.name,
      surname: this.surname,
      age: this.age,
      sex: new Sex(this.sex),
    });
  }
}
