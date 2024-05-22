import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoInsumoDto } from './create-tipo-insumo.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTipoInsumoDto extends PartialType(CreateTipoInsumoDto) {
  @IsString()
  @IsNotEmpty()
  descripcion?: string;
}
