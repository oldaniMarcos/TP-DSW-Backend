import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity.js';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }

  @Post()
  create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clienteService.create(createClienteDto);
  }

  // @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return this.clienteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clienteService.remove(id);
  }
}
