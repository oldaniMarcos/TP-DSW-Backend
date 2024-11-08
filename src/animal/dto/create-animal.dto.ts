import { IsNumber, IsNotEmpty, IsString, IsDateString } from "class-validator";

export class CreateAnimalDto {

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
