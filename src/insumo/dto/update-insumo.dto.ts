import { PartialType } from '@nestjs/mapped-types';
import { CreateInsumoDto } from './create-insumo.dto';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateInsumoDto extends PartialType(CreateInsumoDto) {
  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @IsNumber()
  @IsNotEmpty()
  stock?: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  fechaVencimiento?: Date;
}
