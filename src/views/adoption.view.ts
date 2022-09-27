import { HashTool } from '../tools/hash.tool';
import { CatEntity } from '../database/entities/cat.entity';
import { ClientEntity } from '../database/entities/client.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AdoptionView {
  @ApiProperty({ example: 123 })
  public readonly catId: number;

  @ApiProperty({ example: 'Meowy' })
  public readonly catName: string;

  @ApiProperty({ example: 456 })
  public readonly clientId: number;

  @ApiProperty({ example: 'Max Smith' })
  public readonly clientName: string;

  @ApiProperty({
    example: '3858f62230ac3c915f300c664312c63f',
    description: 'md5 identifier hash',
  })
  public readonly adoptionHash: string;

  @ApiProperty({
    example: '2022-09-27T23:23:03.775Z',
    description: 'Date string in ISO format',
  })
  public readonly adoptionDate: Date;

  constructor(cat: CatEntity, client: ClientEntity) {
    this.catId = cat.id;
    this.catName = cat.name;
    this.clientId = client.id;
    this.clientName = `${client.name} ${client.surname}`;
    this.adoptionDate = cat.adoptionDate;
    this.adoptionHash = HashTool.md5(
      cat.id.toString() + client.id.toString() + cat.adoptionDate.toISOString(),
    );
  }
}
