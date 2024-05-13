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

@Controller('insumo')
export class InsumoController {
  constructor(private readonly insumoService: InsumoService) {}

  @Post()
  create(@Body() createInsumoDto: CreateInsumoDto): Insumo {
    return this.insumoService.create(createInsumoDto);
  }

  @Get()
  findAll(): Insumo[] {
    return this.insumoService.findAll();
  }

  @Get(':codInsumo')
  findOne(@Param('codInsumo', ParseIntPipe) codInsumo: number): Insumo {
    return this.insumoService.findOne(codInsumo);
  }

  @Patch(':codInsumo')
  update(
    @Param('codInsumo', ParseIntPipe) codInsumo: number,
    @Body() updateInsumoDto: UpdateInsumoDto,
  ): Insumo {
    return this.insumoService.update(codInsumo, updateInsumoDto);
  }

  @Delete(':codInsumo')
  remove(@Param('codInsumo', ParseIntPipe) codInsumo: number) {
    return this.insumoService.remove(codInsumo);
  }
}
