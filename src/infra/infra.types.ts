import { ApiProperty } from '@nestjs/swagger';

export class PaginatedList<Model> {
  @ApiProperty({ example: 1 })
  total: number;

  @ApiProperty({ isArray: true })
  result: Model[];

  @ApiProperty({ example: 1 })
  page: number;

  constructor(total: number, result: Model[], page: number) {
    this.total = total;
    this.result = result;
    this.page = page;
  }
}
