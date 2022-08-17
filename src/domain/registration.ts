import { Cat } from '../models/cat/cat.model';
import { Shelter } from '../models/shelter/shelter.model';
import { ValueObject } from './value-object';
import { HashTool } from '../tools/hash.tool';

export class Registration extends ValueObject<Registration> {
  public readonly catId: string;
  public readonly shelterId: string;
  public readonly registrationHash: string;

  constructor(cat: Cat, shelter: Shelter) {
    super();

    this.catId = cat.id;
    this.shelterId = shelter.id;

    this.registrationHash = HashTool.md5(this.catId + this.shelterId);
  }
}
