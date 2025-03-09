import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PrecioAtencionService } from './precio-atencion.service';
import { CreatePrecioAtencionDto } from './dto/create-precio-atencion.dto';
import { UpdatePrecioAtencionDto } from './dto/update-precio-atencion.dto';
import { PrecioAtencion } from './entities/precio-atencion.entity';

@Controller('precio-atencion')
export class PrecioAtencionController {
  constructor(private readonly precioAtencionService: PrecioAtencionService) { }

  @Post()
  create(@Body() createPrecioAtencionDto: CreatePrecioAtencionDto): Promise<PrecioAtencion> {
    return this.precioAtencionService.create(createPrecioAtencionDto);
  }

  @Get()
  findAll(): Promise<PrecioAtencion[]> {
    return this.precioAtencionService.findAll();
  }

  @Get(':idPrecioAtencion')
  findOne(@Param('idPrecioAtencion', ParseIntPipe) idPrecioAtencion: number): Promise<PrecioAtencion> {
    return this.precioAtencionService.findOne(idPrecioAtencion);
  }

  @Patch(':idPrecioAtencion')
  update(@Param('idPrecioAtencion', ParseIntPipe) idPrecioAtencion: number, 
    @Body() updatePrecioAtencionDto: UpdatePrecioAtencionDto): Promise<PrecioAtencion> {
    return this.precioAtencionService.update(idPrecioAtencion, updatePrecioAtencionDto);
  }

  @Delete(':idPrecioAtencion')
  remove(@Param('idPrecioAtencion', ParseIntPipe) idPrecioAtencion: number): Promise<void> {
    return this.precioAtencionService.remove(idPrecioAtencion);
  }

  @Get('list/recent')
  findMostRecent(): Promise<PrecioAtencion> {
    return this.precioAtencionService.findMostRecent();
  }
}
