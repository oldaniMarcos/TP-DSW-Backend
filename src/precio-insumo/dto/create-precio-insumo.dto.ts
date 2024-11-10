import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePrecioInsumoDto {

  @IsDateString()
  @IsNotEmpty()
  fechaDesde: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsNumber()
  @IsNotEmpty()
  valorVenta: number;

  @IsNumber()
  @IsNotEmpty()
  idInsumo: number;
}
