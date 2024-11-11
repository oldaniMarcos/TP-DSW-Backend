import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {

  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
}
