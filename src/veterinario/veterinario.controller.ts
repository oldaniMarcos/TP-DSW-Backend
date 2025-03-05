import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VeterinarioService } from './veterinario.service';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import { Veterinario } from './entities/veterinario.entity.js';


@Controller('veterinario')
export class VeterinarioController {
  constructor(private readonly veterinarioService: VeterinarioService) {}

  @Post()
  create(@Body() createVeterinarioDto: CreateVeterinarioDto): Promise<Veterinario> {
    return this.veterinarioService.create(createVeterinarioDto);
  }

  @Get()
  findAll(): Promise<Veterinario[]> {
    return this.veterinarioService.findAll()
  }

  @Get(':idVeterinario')
  findOne(@Param('idVeterinario', ParseIntPipe) idVeterinario: number): Promise<Veterinario> {
    return this.veterinarioService.findOne(idVeterinario);
  }


  @Patch(':idVeterinario')
  update(@Param('idVeterinario', ParseIntPipe) idVeterinario: number, 
  @Body() updateVeterinarioDto: UpdateVeterinarioDto): Promise<Veterinario> {
    return this.veterinarioService.update(idVeterinario, updateVeterinarioDto);
  }

  @Delete(':idVeterinario')
  remove(@Param('idVeterinario', ParseIntPipe) idVeterinario: number): Promise<void> {
    return this.veterinarioService.remove(idVeterinario);
  }

  @Post('check')
  async checkClienteExists( @Body() body: {dni: string, email: string, nroMatricula: string})
  {
    return await this.veterinarioService.checkExistingFields(body.dni, body.email, body.nroMatricula);
  }
}
