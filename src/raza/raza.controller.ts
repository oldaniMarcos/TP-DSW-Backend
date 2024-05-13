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
import { RazaService } from './raza.service';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';
import { Raza } from './entities/raza.entity';

@Controller('raza')
export class RazaController {
  constructor(private readonly razaService: RazaService) {}

  @Post()
  create(@Body() createRazaDto: CreateRazaDto): Raza {
    return this.razaService.create(createRazaDto);
  }

  @Get()
  findAll(): Raza[] {
    return this.razaService.findAll();
  }

  @Get(':codRaza')
  findOne(@Param('codRaza', ParseIntPipe) codRaza: number): Raza {
    return this.razaService.findOne(codRaza);
  }

  @Patch(':codRaza')
  update(
    @Param('codRaza', ParseIntPipe) codRaza: number,
    @Body() updateRazaDto: UpdateRazaDto,
  ): Raza {
    return this.razaService.update(codRaza, updateRazaDto);
  }

  @Delete(':codRaza')
  remove(@Param('codRaza', ParseIntPipe) codRaza: number) {
    return this.razaService.remove(codRaza);
  }
}
