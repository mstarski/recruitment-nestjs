import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class AdoptCatDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  clientId: number;
}
