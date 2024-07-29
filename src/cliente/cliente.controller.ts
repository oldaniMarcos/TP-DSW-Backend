import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity.js';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }

  @Post()
  create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':dni')
  findOne(@Param('dni', ParseIntPipe) dni: number): Promise<Cliente> {
    return this.clienteService.findOne(dni);
  }

  @Patch(':dni')
  update(@Param('dni', ParseIntPipe) dni: number, @Body() updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    return this.clienteService.update(dni, updateClienteDto);
  }

  @Delete(':dni')
  remove(@Param('dni', ParseIntPipe) dni: number): Promise<void> {
    return this.clienteService.remove(dni);
  }
}
