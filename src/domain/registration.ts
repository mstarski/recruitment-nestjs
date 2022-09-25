import { Cat } from '../models/cat/cat.model';
import { Shelter } from '../models/shelter/shelter.model';
import { HashTool } from '../tools/hash.tool';
import { ValueObject } from './value-object';

export class Registration extends ValueObject<string> {
  public readonly catId: string;
  public readonly shelterId: string;
  public readonly registrationHash: string;

  constructor(cat: Cat, shelter: Shelter) {
    const registrationHash = HashTool.md5(cat.id + shelter.id);
    super(registrationHash);

    this.catId = cat.id;
    this.shelterId = shelter.id;
    this.registrationHash = registrationHash;
  }
}
