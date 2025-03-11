import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAtencionDto {

  @IsDateString()
  @IsNotEmpty()
  fechaHora: string;

  @IsString()
  @IsNotEmpty()
  resultado: string;

  @IsString()
  @IsNotEmpty()             
  observaciones?: string;

  @IsNumber()
  @IsNotEmpty()             
  valor?: number;

  @IsNumber()
  @IsNotEmpty()
  idAnimal: number;

  @IsNumber()
  @IsNotEmpty()
  idPrecio: number;

  @IsNumber()
  @IsNotEmpty()
  idVeterinario: number;

  @IsArray()
  @IsNotEmpty()
  idsInsumos: number[];
}
