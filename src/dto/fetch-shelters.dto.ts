import { PaginationDto } from './pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FetchSheltersDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name?: string;
}
