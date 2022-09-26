import { Cat } from '../models/cat/cat.model';
import { Shelter } from '../models/shelter/shelter.model';
import { HashTool } from '../tools/hash.tool';

export class Registration {
  public readonly catId: number;
  public readonly shelterId: number;
  public readonly registrationHash: string;

  constructor(cat: Cat, shelter: Shelter) {
    this.catId = cat.id;
    this.shelterId = shelter.id;
    this.registrationHash = HashTool.md5(
      cat.id.toString() + shelter.id.toString(),
    );
  }
}
