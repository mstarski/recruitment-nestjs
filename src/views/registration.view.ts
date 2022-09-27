import { HashTool } from '../tools/hash.tool';
import { CatEntity } from '../database/entities/cat.entity';
import { ShelterEntity } from '../database/entities/shelter.entity';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationView {
  @ApiProperty({ example: 123 })
  public readonly catId: number;

  @ApiProperty({ example: 'Meowy' })
  public readonly catName: string;

  @ApiProperty({ example: 456 })
  public readonly shelterId: number;

  @ApiProperty({ example: 'Sample Shelter' })
  public readonly shelterName: string;

  @ApiProperty({
    example: '3858f62230ac3c915f300c664312c63f',
    description: 'md5 identifier hash',
  })
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
