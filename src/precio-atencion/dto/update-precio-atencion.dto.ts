import { PartialType } from '@nestjs/mapped-types';
import { CreatePrecioAtencionDto } from './create-precio-atencion.dto';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdatePrecioAtencionDto extends PartialType(CreatePrecioAtencionDto) {

  /*@IsNumber()
  @IsNotEmpty()
  @IsOptional()
  idAtencion?: number;*/

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  fechaDesde?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  valor?: number;

}
