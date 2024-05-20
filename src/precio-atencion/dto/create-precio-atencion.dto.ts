import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePrecioAtencionDto {

  @IsNumber()
  @IsNotEmpty()
  idAtencion: number;

  @IsDateString()
  @IsNotEmpty()
  fechaDesde: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

}
