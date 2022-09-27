import { PaginationDto } from './pagination.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FetchClientsDto extends PaginationDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  surname?: string;
}
