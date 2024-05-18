import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EspecieService } from './especie.service';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { Especie } from './entities/especie.entity.js';

@Controller('especie')
export class EspecieController {
  constructor(private readonly especieService: EspecieService) {}

  @Post()
  create(@Body() createEspecieDto: CreateEspecieDto): Especie {
    return this.especieService.create(createEspecieDto);
  }

  @Get()
  findAll(): Especie[] {
    return this.especieService.findAll();
  }

  @Get(':codEspecie')
  findOne(@Param('codEspecie', ParseIntPipe) codEspecie: number): Especie {
    return this.especieService.findOne(codEspecie);
  }

  @Patch(':codEspecie')
  update(@Param('codEspecie', ParseIntPipe) codEspecie: number, @Body() updateEspecieDto: UpdateEspecieDto): Especie {
    return this.especieService.update(codEspecie, updateEspecieDto);
  }

  @Delete(':codEspecie')
  remove(@Param('codEspecie', ParseIntPipe) codEspecie: number) {
    return this.especieService.remove(codEspecie);
  }
}
