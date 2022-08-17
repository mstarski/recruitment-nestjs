import { PaginationDto } from './pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class FetchSheltersDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name?: string;
}
