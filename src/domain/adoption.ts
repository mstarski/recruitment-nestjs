import { Cat } from '../models/cat/cat.model';
import { Client } from '../models/client/client.model';
import { HashTool } from '../tools/hash.tool';
import { ValueObject } from './value-object';

export class Adoption extends ValueObject<string> {
  public readonly catId: string;
  public readonly clientId: string;
  public readonly adoptionHash: string;

  constructor(cat: Cat, client: Client) {
    const adoptionHash = HashTool.md5(cat.id + client.id);
    super(adoptionHash);

    this.catId = cat.id;
    this.clientId = client.id;
    this.adoptionHash = adoptionHash;
  }
}
