import { ValueObject } from './value-object';
import { Cat } from '../models/cat/cat.model';
import { Client } from '../models/client/client.model';
import { HashTool } from '../tools/hash.tool';

export class Adoption extends ValueObject<Adoption> {
  public readonly catId: string;
  public readonly clientId: string;
  public readonly adoptionHash: string;

  constructor(cat: Cat, client: Client) {
    super();

    this.catId = cat.id;
    this.clientId = client.id;

    this.adoptionHash = HashTool.md5(this.catId + this.clientId);
  }
}
