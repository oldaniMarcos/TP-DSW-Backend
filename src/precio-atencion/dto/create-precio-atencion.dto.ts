import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePrecioAtencionDto {

  @IsDateString()
  @IsNotEmpty()
  fechaDesde: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

}
