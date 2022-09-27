import { ApiProperty } from '@nestjs/swagger';

export class PaginatedList<Model> {
  @ApiProperty({ example: 1 })
  total: number;

  @ApiProperty({ isArray: true })
  result: Model[];

  constructor(total: number, result: Model[]) {
    this.total = total;
    this.result = result;
  }
}
