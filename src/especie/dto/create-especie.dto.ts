import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEspecieDto {

    @IsString()
    @IsNotEmpty()
    descripcion: string;
}
