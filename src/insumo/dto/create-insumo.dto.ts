import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInsumoDto {
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsDateString()
  @IsNotEmpty()
  fechaVencimiento: string;

  @IsNumber()
  @IsNotEmpty()
  idTipoInsumo: number;
  
}
