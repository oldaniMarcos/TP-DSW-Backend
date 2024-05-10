import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity.js';

@Injectable()
export class ClienteService {

  private clientes: Cliente[] = [
    { dni: 11111111, nombreYApellido: 'cliente1', telefono: '11111111', direccion: 'dir1', email: 'cliente1@gmail.com', usuario: 'user1', password: 'pass1' },
    { dni: 22222222, nombreYApellido: 'cliente2', telefono: '22222222', direccion: 'dir2', email: 'cliente2@gmail.com', usuario: 'user2', password: 'pass2' },
    { dni: 33333333, nombreYApellido: 'cliente3', telefono: '33333333', direccion: 'dir3', email: 'cliente3@gmail.com', usuario: 'user3', password: 'pass3' },
  ];

  create(createClienteDto: CreateClienteDto): Cliente {

    const cliente = new Cliente();
    cliente.dni = createClienteDto.dni;
    cliente.nombreYApellido = createClienteDto.nombreYApellido;
    cliente.telefono = createClienteDto.telefono;
    cliente.direccion = createClienteDto.direccion;
    cliente.email = createClienteDto.email;
    cliente.usuario = createClienteDto.usuario;
    cliente.password = createClienteDto.password;

    this.clientes.push(cliente);

    return cliente;
  }

  findAll(): Cliente[] {
    return this.clientes;
  }

  findOne(dni: number): Cliente {

    const cliente = this.clientes.find(cliente => cliente.dni === dni);

    if (!cliente) throw new NotFoundException(`Cliente con dni ${dni} no fue encontrado.`);

    return cliente;
  }

  update(dni: number, updateClienteDto: UpdateClienteDto): Cliente {

    const { nombreYApellido, telefono, direccion, email, usuario, password } = updateClienteDto;

    const cliente = this.findOne(dni);

    if (nombreYApellido) cliente.nombreYApellido = nombreYApellido;
    if (telefono) cliente.telefono = telefono;
    if (direccion) cliente.direccion = direccion;
    if (email) cliente.email = email;
    if (usuario) cliente.usuario = usuario;
    if (password) cliente.password = password;

    this.clientes = this.clientes.map(dbCliente => {
      if (dbCliente.dni === dni) return cliente;
      return dbCliente;
    });

    return cliente;
  }

  remove(dni: number) {

    this.findOne(dni);

    this.clientes = this.clientes.filter(cliente => cliente.dni !== dni);

  }
}
