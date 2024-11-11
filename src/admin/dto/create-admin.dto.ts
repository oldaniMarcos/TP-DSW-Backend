import { IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {

  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
