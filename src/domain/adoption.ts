import { HashTool } from '../tools/hash.tool';
import { CatEntity } from '../database/entities/cat.entity';
import { ClientEntity } from '../database/entities/client.entity';

export class Adoption {
  public readonly catId: number;
  public readonly clientId: number;
  public readonly adoptionHash: string;
  public readonly adoptionDate: Date;

  constructor(cat: CatEntity, client: ClientEntity) {
    this.catId = cat.id;
    this.clientId = client.id;
    this.adoptionDate = cat.adoptionDate;
    this.adoptionHash = HashTool.md5(cat.id.toString() + client.id.toString());
  }
}
