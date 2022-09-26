import { Cat } from '../models/cat/cat.model';
import { Client } from '../models/client/client.model';
import { HashTool } from '../tools/hash.tool';

export class Adoption {
  public readonly catId: number;
  public readonly clientId: number;
  public readonly adoptionHash: string;

  constructor(cat: Cat, client: Client) {
    this.catId = cat.id;
    this.clientId = client.id;
    this.adoptionHash = HashTool.md5(cat.id.toString() + client.id.toString());
  }
}
