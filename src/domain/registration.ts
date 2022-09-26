import { HashTool } from '../tools/hash.tool';
import { CatEntity } from '../database/entities/cat.entity';
import { ShelterEntity } from '../database/entities/shelter.entity';

export class Registration {
  public readonly catId: number;
  public readonly catName: string;
  public readonly shelterId: number;
  public readonly shelterName: string;
  public readonly registrationHash: string;

  constructor(cat: CatEntity, shelter: ShelterEntity) {
    this.catId = cat.id;
    this.catName = cat.name;
    this.shelterId = shelter.id;
    this.shelterName = shelter.name;
    this.registrationHash = HashTool.md5(
      cat.id.toString() + shelter.id.toString(),
    );
  }
}
