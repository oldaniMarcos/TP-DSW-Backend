import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClienteService {

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ) { }

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {

    const cliente = new Cliente();
    cliente.dni = createClienteDto.dni;
    cliente.nombreYApellido = createClienteDto.nombreYApellido;
    cliente.telefono = createClienteDto.telefono;
    cliente.direccion = createClienteDto.direccion;
    cliente.email = createClienteDto.email;
    cliente.usuario = createClienteDto.usuario;

    const saltOrRounds = 10
    cliente.password = await bcrypt.hash(createClienteDto.password, saltOrRounds);

    return this.clienteRepository.save(cliente)
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  findOne(id: number): Promise<Cliente> {
    return this.clienteRepository.findOneBy({ id: id });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {

    if (updateClienteDto.password) {
      const saltOrRounds = 10;
      updateClienteDto.password = await bcrypt.hash(updateClienteDto.password, saltOrRounds);
    }

    await this.clienteRepository.update(id, updateClienteDto);
    return this.clienteRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.clienteRepository.delete(id)
  }

  async login(usuario: string, password: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOneBy({ usuario });
    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, cliente.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Datos de login invalidos');
    }

    return cliente;
  }
}
