import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VeterinarioService } from './veterinario.service';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import { Veterinario } from './entities/veterinario.entity.js';


@Controller('veterinario')
export class VeterinarioController {
  constructor(private readonly veterinarioService: VeterinarioService) {}

  @Post()
  create(@Body() createVeterinarioDto: CreateVeterinarioDto): Veterinario {
    return this.veterinarioService.create(createVeterinarioDto);
  }

  @Get()
  findAll(): Veterinario[] {
    return this.veterinarioService.findAll()
  }

  @Get(':nroMatricula')
  findOne(@Param('nroMatricula', ParseIntPipe) nroMatricula: number): Veterinario {
    return this.veterinarioService.findOne(nroMatricula);
  }


  @Patch(':nroMatricula')
  update(@Param('nroMatricula', ParseIntPipe) nroMatricula: number, @Body() updateVeterinarioDto: UpdateVeterinarioDto): Veterinario {
    return this.veterinarioService.update(nroMatricula, updateVeterinarioDto);
  }

  @Delete(':nroMatricula')
  remove(@Param('nroMatricula', ParseIntPipe) nroMatricula: number) {
    return this.veterinarioService.remove(nroMatricula);
  }
}
