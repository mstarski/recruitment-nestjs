import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  page = 1;

  @Type(() => Number)
  @IsInt()
  limit = 10;
}
