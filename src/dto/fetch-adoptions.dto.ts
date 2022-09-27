import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { Type } from 'class-transformer';

export class FetchAdoptionsDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  catId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  clientId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateFrom?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateTo?: Date;

  constructor() {
    super();

    if (!this.dateTo) {
      this.dateTo = this.dateFrom;
    }
  }
}
