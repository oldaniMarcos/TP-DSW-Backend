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
    cliente.rol = createClienteDto.rol //<---
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

  async findByUsuario(usuario: string): Promise<Cliente | undefined> {
    return this.clienteRepository.findOneBy({ usuario })
  }

  async checkExistingFields(dni: string, email: string, usuario: string) {

    let existingDni = await this.clienteRepository.query(
      'SELECT * FROM cliente WHERE dni = ?',
      [dni]
    )
    let existingUsuario = await this.clienteRepository.query(
      'SELECT * FROM cliente WHERE usuario = ?',
      [usuario]
    )
    let existingEmail = await this.clienteRepository.query(
      'SELECT * FROM cliente WHERE email = ?',
      [email]
    )   
  
    return { 
      dni: existingDni.length > 0, 
      email: existingEmail.length > 0, 
      usuario: existingUsuario.length > 0 
    };
  }  
}
