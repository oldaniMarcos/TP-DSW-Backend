import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoInsumoDto {
  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
