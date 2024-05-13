import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInsumoDto {
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  fechaVencimiento: Date;
}
