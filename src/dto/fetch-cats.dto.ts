import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { Type } from 'class-transformer';

export class FetchCatsDto extends PaginationDto {
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  shelterId: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name?: string;
}
