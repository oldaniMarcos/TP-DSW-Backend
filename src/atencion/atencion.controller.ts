import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AtencionService } from './atencion.service';
import { CreateAtencionDto } from './dto/create-atencion.dto';
import { UpdateAtencionDto } from './dto/update-atencion.dto';
import { Atencion } from './entities/atencion.entity.js';

@Controller('atencion')
export class AtencionController {
  constructor(private readonly atencionService: AtencionService) { }

  @Post()
  create(@Body() createAtencionDto: CreateAtencionDto): Atencion {
    return this.atencionService.create(createAtencionDto);
  }

  @Get()
  findAll(): Atencion[] {
    return this.atencionService.findAll();
  }

  @Get(':idAtencion')
  findOne(@Param('idAtencion', ParseIntPipe) idAtencion: number): Atencion {
    return this.atencionService.findOne(idAtencion);
  }

  @Patch(':idAtencion')
  update(@Param('idAtencion', ParseIntPipe) idAtencion: number, @Body() updateAtencionDto: UpdateAtencionDto): Atencion {
    return this.atencionService.update(idAtencion, updateAtencionDto);
  }

  @Delete(':idAtencion')
  remove(@Param('idAtencion', ParseIntPipe) idAtencion: number) {
    return this.atencionService.remove(idAtencion);
  }
}
