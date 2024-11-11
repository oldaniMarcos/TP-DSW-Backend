import { PartialType } from '@nestjs/mapped-types';
import { CreateAtencionDto } from './create-atencion.dto';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAtencionDto extends PartialType(CreateAtencionDto) {

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()       // -> es opcional actualizar la fecha, pero si lo hago, no son vacias
  fechaHora?: string;

  @IsOptional()
  @IsString()
  resultado?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsNumber()
  @IsNotEmpty()
  idAnimal: number;

  @IsNumber()
  @IsNotEmpty()
  idPrecio: number;

  @IsNumber()
  @IsNotEmpty()
  idVeterinario: number;

  @IsArray()
  @IsNotEmpty()
  idsInsumos: number[];

}
