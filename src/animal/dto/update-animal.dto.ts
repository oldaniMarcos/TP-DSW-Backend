import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalDto } from './create-animal.dto';
import { IsString, IsNumber, IsDateString, IsOptional } from "class-validator";

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {

    @IsString()
    @IsOptional()
    nombre?: string;

    @IsDateString()
    @IsOptional()
    fechaNac?: string;

    @IsNumber()
    @IsOptional()
    edad?: number;
}
