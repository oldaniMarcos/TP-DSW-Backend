import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRazaDto {
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  idEspecie: number;
}
