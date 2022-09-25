import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class FetchCatsDto extends PaginationDto {
  @IsUUID()
  @ApiProperty()
  shelterId: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;
}
