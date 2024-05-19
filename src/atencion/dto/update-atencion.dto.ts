import { PartialType } from '@nestjs/mapped-types';
import { CreateAtencionDto } from './create-atencion.dto';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAtencionDto extends PartialType(CreateAtencionDto) {

  //no se para que actualizariamos una atencion igual, pero bueno

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

}
