import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class FetchCatsDto extends PaginationDto {
  @IsUUID()
  shelterId: string;

  @IsString()
  @IsOptional()
  name?: string;
}
