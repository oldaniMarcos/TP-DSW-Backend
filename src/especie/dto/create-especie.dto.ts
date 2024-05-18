import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEspecieDto {
    @IsNumber()
    @IsNotEmpty()
    codEspecie: number;

    @IsString()
    @IsNotEmpty()
    descripcion: string;
}
