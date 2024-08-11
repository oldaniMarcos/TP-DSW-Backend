import { PartialType } from '@nestjs/mapped-types';
import { CreateVeterinarioDto } from './create-veterinario.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVeterinarioDto extends PartialType(CreateVeterinarioDto) {

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    nroMatricula: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    dni: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    nombreYApellido?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    telefono?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    direccion?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    email?: string;

}
