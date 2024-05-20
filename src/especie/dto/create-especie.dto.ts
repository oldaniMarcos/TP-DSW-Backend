import { IsNotEmpty, IsString } from "class-validator";

export class CreateEspecieDto {

    @IsString()
    @IsNotEmpty()
    descripcion: string;
}
