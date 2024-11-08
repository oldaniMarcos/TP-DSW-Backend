import { PartialType } from '@nestjs/mapped-types';
import { CreatePrecioInsumoDto } from './create-precio-insumo.dto';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdatePrecioInsumoDto extends PartialType(CreatePrecioInsumoDto) {

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  fechaDesde?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  valor?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  valorVenta?: number;
}
