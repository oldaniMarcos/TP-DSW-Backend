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
import { InsumoService } from './insumo.service';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { Insumo } from './entities/insumo.entity';
import { TipoInsumo } from '../tipo-insumo/entities/tipo-insumo.entity';

@Controller('insumo')
export class InsumoController {
  constructor(private readonly insumoService: InsumoService) {}

  @Post()
  create(@Body() createInsumoDto: CreateInsumoDto): Promise<Insumo> {
    return this.insumoService.create(createInsumoDto);
  }

  @Get()
  findAll(): Promise<Insumo[]> {
    return this.insumoService.findAll();
  }

  @Get(':codInsumo')
  findOne(@Param('codInsumo', ParseIntPipe) codInsumo: number): Promise<Insumo> {
    return this.insumoService.findOne(codInsumo);
  }

  @Patch(':codInsumo')
  update(
    @Param('codInsumo', ParseIntPipe) codInsumo: number,
    @Body() updateInsumoDto: UpdateInsumoDto,
  ): Promise<Insumo> {
    return this.insumoService.update(codInsumo, updateInsumoDto);
  }

  @Delete(':codInsumo')
  remove(@Param('codInsumo', ParseIntPipe) codInsumo: number): Promise<void> {
    return this.insumoService.remove(codInsumo);
  }

  @Patch(':codInsumo/decrease-stock')
  async decreaseStock(
    @Param('codInsumo', ParseIntPipe) codInsumo: number,
    @Body('cantidad') cantidad: number,
  ): Promise<Insumo> {
    return this.insumoService.decreaseStock(codInsumo, cantidad);
  }

  @Get(':codInsumo/tipo-insumo')
    findTipoInsumo(@Param('codInsumo', ParseIntPipe) codInsumo: number): Promise<TipoInsumo> {
      return this.insumoService.findTipoInsumo(codInsumo);
  }

  @Get('exists/tipo-insumo/:id')
  async tipoInsumoHasInsumo(@Param('id') idTipoInsumo: number): Promise<{ exists: boolean }> {
  const exists = await this.insumoService.tipoInsumoHasInsumo(idTipoInsumo);
  return { exists };
  }
}
