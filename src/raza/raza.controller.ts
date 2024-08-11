import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RazaService } from './raza.service';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';
import { Raza } from './entities/raza.entity';

@Controller('raza')
export class RazaController {
  constructor(private readonly razaService: RazaService) {}

  @Post()
  create(@Body() createRazaDto: CreateRazaDto): Promise<Raza> {
    return this.razaService.create(createRazaDto);
  }

  @Get()
  findAll(): Promise<Raza[]> {
    return this.razaService.findAll();
  }

  @Get(':codRaza')
  findOne(@Param('codRaza', ParseIntPipe) codRaza: number): Promise<Raza> {
    return this.razaService.findOne(codRaza);
  }

  @Patch(':codRaza')
  update(@Param('codRaza', ParseIntPipe) codRaza: number, 
  @Body() updateRazaDto: UpdateRazaDto): Promise<Raza> {
    return this.razaService.update(codRaza, updateRazaDto);
  }

  @Delete(':codRaza')
  remove(@Param('codRaza', ParseIntPipe) codRaza: number): Promise<void> {
    return this.razaService.remove(codRaza);
  }
}
