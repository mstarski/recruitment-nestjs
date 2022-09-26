import { PaginationDto } from './pagination.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FetchClientsDto extends PaginationDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  surname?: string;
}
