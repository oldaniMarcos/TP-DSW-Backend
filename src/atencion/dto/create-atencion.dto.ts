import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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
  idAnimal: number;

  @IsNumber()
  @IsNotEmpty()
  idPrecio: number;

  @IsNumber()
  @IsNotEmpty()
  idVeterinario: number;

  @IsNumber()
  @IsNotEmpty()
  idsInsumos: number[];
}
