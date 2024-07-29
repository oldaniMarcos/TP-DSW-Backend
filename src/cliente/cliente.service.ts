import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ) { }

  create(createClienteDto: CreateClienteDto): Promise<Cliente> {

    const cliente = new Cliente();
    cliente.dni = createClienteDto.dni;
    cliente.nombreYApellido = createClienteDto.nombreYApellido;
    cliente.telefono = createClienteDto.telefono;
    cliente.direccion = createClienteDto.direccion;
    cliente.email = createClienteDto.email;
    cliente.usuario = createClienteDto.usuario;
    cliente.password = createClienteDto.password;

    return this.clienteRepository.save(cliente)
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  findOne(id: number): Promise<Cliente> {
    return this.clienteRepository.findOneBy({ id: id });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    await this.clienteRepository.update(id, updateClienteDto);
    return this.clienteRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.clienteRepository.delete(id)
  }
}
