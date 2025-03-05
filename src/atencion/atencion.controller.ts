import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AtencionService } from './atencion.service';
import { CreateAtencionDto } from './dto/create-atencion.dto';
import { UpdateAtencionDto } from './dto/update-atencion.dto';
import { Atencion } from './entities/atencion.entity.js';

@Controller('atencion')
export class AtencionController {
  constructor(private readonly atencionService: AtencionService) { }

  @Post()
  create(@Body() createAtencionDto: CreateAtencionDto): Promise<Atencion> {
    return this.atencionService.create(createAtencionDto);
  }

  @Get()
  findAll(): Promise<Atencion[]> {
    return this.atencionService.findAll();
  }

  @Get(':idAtencion')
  findOne(@Param('idAtencion', ParseIntPipe) idAtencion: number): Promise<Atencion> {
    return this.atencionService.findOne(idAtencion);
  }

  @Patch(':idAtencion')
  update(@Param('idAtencion', ParseIntPipe) idAtencion: number, @Body() updateAtencionDto: UpdateAtencionDto): Promise<Atencion> {
    return this.atencionService.update(idAtencion, updateAtencionDto);
  }

  @Delete(':idAtencion')
  remove(@Param('idAtencion', ParseIntPipe) idAtencion: number): Promise<void> {
    return this.atencionService.remove(idAtencion);
  }

  @Get('cliente/:clienteId')
  findByClienteId(@Param('clienteId') clienteId: number): Promise<Atencion[]> {
  return this.atencionService.findByClienteId(+clienteId);
  }

  @Get('exists/animal/:id')
  async hasAtencionWithAnimal(@Param('id') idAnimal: number): Promise<{ exists: boolean }> {
  const exists = await this.atencionService.hasAtencionWithAnimal(idAnimal);
  return { exists };
}

  @Get('exists/veterinario/:id')
  async hasAtencionWithVeterinario(@Param('id') idVeterinario: number): Promise<{ exists: boolean }> {
  const exists = await this.atencionService.hasAtencionWithVeterinario(idVeterinario);
  return { exists };
}
}
