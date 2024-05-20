import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PrecioAtencionService } from './precio-atencion.service';
import { CreatePrecioAtencionDto } from './dto/create-precio-atencion.dto';
import { UpdatePrecioAtencionDto } from './dto/update-precio-atencion.dto';
import { PrecioAtencion } from './entities/precio-atencion.entity.js';

@Controller('precio-atencion')
export class PrecioAtencionController {
  constructor(private readonly precioAtencionService: PrecioAtencionService) { }

  @Post()
  create(@Body() createPrecioAtencionDto: CreatePrecioAtencionDto): PrecioAtencion {
    return this.precioAtencionService.create(createPrecioAtencionDto);
  }

  @Get()
  findAll(): PrecioAtencion[] {
    return this.precioAtencionService.findAll();
  }

  @Get(':idPrecioAtencion')
  findOne(@Param('idPrecioAtencion', ParseIntPipe) idPrecioAtencion: number): PrecioAtencion {
    return this.precioAtencionService.findOne(idPrecioAtencion);
  }

  @Patch(':idPrecioAtencion')
  update(@Param('idPrecioAtencion', ParseIntPipe) idPrecioAtencion: number, @Body() updatePrecioAtencionDto: UpdatePrecioAtencionDto): PrecioAtencion {
    return this.precioAtencionService.update(idPrecioAtencion, updatePrecioAtencionDto);
  }

  @Delete(':idPrecioAtencion')
  remove(@Param('idPrecioAtencion', ParseIntPipe) idPrecioAtencion: number) {
    return this.precioAtencionService.remove(idPrecioAtencion);
  }
}
