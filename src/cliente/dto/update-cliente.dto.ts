import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {

  @IsString()
  @IsOptional()
  dni?: string;

  @IsString()
  @IsOptional()
  nombreYApellido?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @IsIn(['cliente', 'admin'])
  rol: 'cliente' | 'admin';

  @IsString()
  @IsOptional()
  usuario?: string;

  @IsString()
  @IsOptional()
  password?: string;

}
