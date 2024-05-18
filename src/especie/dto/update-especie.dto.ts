import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecieDto } from './create-especie.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEspecieDto extends PartialType(CreateEspecieDto) {
    @IsString()
    @IsNotEmpty()
    descripcion?: string;
}
