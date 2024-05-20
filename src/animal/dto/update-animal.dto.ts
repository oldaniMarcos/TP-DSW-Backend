import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalDto } from './create-animal.dto';
import { IsNumber, IsDateString, IsOptional } from "class-validator";

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {

    @IsDateString()
    @IsOptional()
    fechaNac?: string;

    @IsNumber()
    @IsOptional()
    edad?: number;
}
