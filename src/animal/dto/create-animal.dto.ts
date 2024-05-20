import { IsNumber, IsNotEmpty, IsString, IsDateString } from "class-validator";

export class CreateAnimalDto {

    @IsNumber()
    @IsNotEmpty()
    nroHistClinica: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsDateString()
    @IsNotEmpty()
    fechaNac: string;

    @IsNumber()
    @IsNotEmpty()
    edad: number;
}
