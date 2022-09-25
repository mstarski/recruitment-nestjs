import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  page = 1;

  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  limit = 10;
}
