import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePrecioInsumoDto {
  /*@IsNumber()
  @IsNotEmpty()
  codInsumo: number;*/

  @IsDateString()
  @IsNotEmpty()
  fechaDesde: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsNumber()
  @IsNotEmpty()
  valorVenta: number;
}
