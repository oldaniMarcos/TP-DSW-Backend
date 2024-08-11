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
import { TipoInsumoService } from './tipo-insumo.service';
import { CreateTipoInsumoDto } from './dto/create-tipo-insumo.dto';
import { UpdateTipoInsumoDto } from './dto/update-tipo-insumo.dto';
import { TipoInsumo } from './entities/tipo-insumo.entity';

@Controller('tipo-insumo')
export class TipoInsumoController {
  constructor(private readonly tipoInsumoService: TipoInsumoService) {}

  @Post()
  create(@Body() createTipoInsumoDto: CreateTipoInsumoDto): Promise<TipoInsumo> {
    return this.tipoInsumoService.create(createTipoInsumoDto);
  }

  @Get()
  findAll(): Promise<TipoInsumo[]> {
    return this.tipoInsumoService.findAll();
  }

  @Get(':codTipoInsumo')
  findOne(@Param('codTipoInsumo', ParseIntPipe) codTipoInsumo: number): Promise<TipoInsumo> {
    return this.tipoInsumoService.findOne(codTipoInsumo);
  }

  @Patch(':codTipoInsumo')
  update(@Param('codTipoInsumo', ParseIntPipe) codTipoInsumo: number, 
  @Body() updateTipoInsumoDto: UpdateTipoInsumoDto): Promise<TipoInsumo> {
    return this.tipoInsumoService.update(codTipoInsumo, updateTipoInsumoDto);
  }

  @Delete(':codTipoInsumo')
  remove(@Param('codTipoInsumo', ParseIntPipe) codTipoInsumo: number): Promise<void> {
    return this.tipoInsumoService.remove(codTipoInsumo);
  }
}
