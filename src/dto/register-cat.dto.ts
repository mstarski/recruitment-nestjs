import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Allow, IsIn } from 'class-validator';

export class RegisterCatDto {
  @ApiProperty()
  @Allow()
  name: string;

  @ApiProperty()
  @Type(() => Number)
  @IsIn([0, 1])
  sex: number;

  @ApiProperty({ required: false, default: 'stray' })
  @Allow()
  breed?: string = 'stray';
}
