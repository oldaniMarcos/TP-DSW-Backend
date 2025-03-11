import { IsNotEmpty, IsString } from "class-validator";

export class CreateVeterinarioDto {

    @IsString()
    @IsNotEmpty()
    nroMatricula: string;

    @IsString()
    @IsNotEmpty()
    dni: string;

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
