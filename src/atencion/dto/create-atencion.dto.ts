import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAtencionDto {

  @IsDateString()
  @IsNotEmpty()
  fechaHora: string;

  @IsString()
  @IsNotEmpty()
  resultado: string;

  @IsString()
  @IsOptional()             //observacion es opcional
  observaciones?: string;

}
