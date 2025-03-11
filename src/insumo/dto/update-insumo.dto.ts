import { PartialType } from '@nestjs/mapped-types';
import { CreateInsumoDto } from './create-insumo.dto';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateInsumoDto extends PartialType(CreateInsumoDto) {
  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @IsNumber()
  @IsNotEmpty()
  stock?: number;

  @IsDateString()
  @IsNotEmpty()
  fechaVencimiento?: string;

  @IsNumber()
  @IsNotEmpty()
  idTipoInsumo: number;
}
