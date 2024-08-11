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
import { PrecioInsumoService } from './precio-insumo.service';
import { CreatePrecioInsumoDto } from './dto/create-precio-insumo.dto';
import { UpdatePrecioInsumoDto } from './dto/update-precio-insumo.dto';
import { PrecioInsumo } from './entities/precio-insumo.entity';

@Controller('precio-insumo')
export class PrecioInsumoController {
  constructor(private readonly precioInsumoService: PrecioInsumoService) {}

  @Post()
  create(@Body() createPrecioInsumoDto: CreatePrecioInsumoDto): Promise<PrecioInsumo> {
    return this.precioInsumoService.create(createPrecioInsumoDto);
  }

  @Get()
  findAll():Promise<PrecioInsumo[]> {
    return this.precioInsumoService.findAll();
  }

  @Get(':codPrecioInsumo')
  findOne(@Param('codPrecioInsumo', ParseIntPipe) codPrecioInsumo: number): Promise<PrecioInsumo> {
    return this.precioInsumoService.findOne(codPrecioInsumo);
  }

  @Patch(':codPrecioInsumo')
  update(@Param('codPrecioInsumo', ParseIntPipe) codPrecioInsumo: number, 
  @Body() updatePrecioInsumoDto: UpdatePrecioInsumoDto): Promise<PrecioInsumo> {
    return this.precioInsumoService.update(codPrecioInsumo,updatePrecioInsumoDto);
  }

  @Delete(':codPrecioInsumo')
  remove(@Param('codPrecioInsumo', ParseIntPipe) codPrecioInsumo: number):Promise<void> {
    return this.precioInsumoService.remove(codPrecioInsumo);
  }
}
