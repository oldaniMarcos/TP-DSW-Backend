import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVeterinarioDto {

    @IsNumber()
    @IsNotEmpty()
    nroMatricula: number;

    @IsNumber()
    @IsNotEmpty()
    dni: number;

    @IsString()
    @IsNotEmpty()
    nombreYApellido: string;

    @IsString()
    @IsNotEmpty()
    telefono: string;

    @IsString()
    @IsNotEmpty()
    direccion: string;

    @IsString()
    @IsNotEmpty()
    email: string;

}
