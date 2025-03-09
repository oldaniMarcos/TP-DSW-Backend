import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EspecieService } from './especie.service';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { Especie } from './entities/especie.entity';
import { Raza } from '../raza/entities/raza.entity';

@Controller('especie')
export class EspecieController {
  constructor(private readonly especieService: EspecieService) { }

  @Post()
  create(@Body() createEspecieDto: CreateEspecieDto): Promise<Especie> {
    return this.especieService.create(createEspecieDto);
  }

  @Get()
  findAll(): Promise<Especie[]> {
    return this.especieService.findAll();
  }

  @Get(':codEspecie')
  findOne(@Param('codEspecie', ParseIntPipe) codEspecie: number): Promise<Especie> {
    Promise<Especie>
    return this.especieService.findOne(codEspecie);
  }

  @Patch(':codEspecie')
  update(@Param('codEspecie', ParseIntPipe) codEspecie: number, @Body() updateEspecieDto: UpdateEspecieDto): Promise<Especie> {
    return this.especieService.update(codEspecie, updateEspecieDto);
  }

  @Delete(':codEspecie')
  remove(@Param('codEspecie', ParseIntPipe) codEspecie: number): Promise<void> {
    return this.especieService.remove(codEspecie);
  }

  @Get(':codEspecie/razas')
  findRazasByEspecieId(@Param('codEspecie', ParseIntPipe) codEspecie: number): Promise<Raza[]> {
    return this.especieService.findRazasByEspecieId(codEspecie);
  }
}
