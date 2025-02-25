import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalDto } from './create-animal.dto';
import { IsString, IsNumber, IsDateString, IsOptional, IsNotEmpty } from "class-validator";

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {

    @IsString()
    @IsOptional()
    nombre?: string;

    @IsDateString()
    @IsOptional()
    fechaNac?: string;

    @IsNumber()
    @IsNotEmpty()
    idCliente: number;

    @IsNumber()
    @IsNotEmpty()
    idRaza: number;
}
