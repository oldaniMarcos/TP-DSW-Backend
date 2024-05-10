import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRazaDto {
  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
