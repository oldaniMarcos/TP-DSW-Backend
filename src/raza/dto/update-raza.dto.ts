import { PartialType } from '@nestjs/mapped-types';
import { CreateRazaDto } from './create-raza.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateRazaDto extends PartialType(CreateRazaDto) {
  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @IsNumber()
  @IsNotEmpty()
  idEspecie: number;
}
