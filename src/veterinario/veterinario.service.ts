import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import { Veterinario } from './entities/veterinario.entity.js';

@Injectable()
export class VeterinarioService {
  private veterinarios: Veterinario[] = [
    { nroMatricula: 1010, dni: 44333555, nombreYApellido: 'Juan Perez', telefono: '3417772222', direccion:'pellegrini 1000', email:'juanperez@gmail.com'}, 

    { nroMatricula: 2020, dni: 33777000, nombreYApellido: 'Jose Garcia', telefono: '3419991111', direccion:'cordoba 2000', email:'josegarcia@gmail.com'}, 

    { nroMatricula: 3030, dni: 22888111, nombreYApellido: 'Roberto Fernandez', telefono: '3415553333', direccion:'zeballos 3000', email:'robertofernandez@gmail.com'}, 
  ];


  create(createVeterinarioDto: CreateVeterinarioDto): Veterinario {
    const veterinario = new Veterinario();
    veterinario.nroMatricula = createVeterinarioDto.nroMatricula;
    veterinario.dni = createVeterinarioDto.dni;
    veterinario.nombreYApellido = createVeterinarioDto.nombreYApellido;
    veterinario.telefono = createVeterinarioDto.telefono;
    veterinario.direccion = createVeterinarioDto.direccion;
    veterinario.email = createVeterinarioDto.email;

    this.veterinarios.push(veterinario);
    return veterinario;
  }

  findAll(): Veterinario[] {
    return this.veterinarios;
  }

  findOne(nroMatricula: number): Veterinario {
    const veterinario = this.veterinarios.find(veterinario => veterinario.nroMatricula === nroMatricula)

    if (!veterinario) throw new NotFoundException(`Veterinario con matrícula ${nroMatricula} no fue encontrado`)

    return veterinario;
  }

  update(nroMatricula: number, updateVeterinarioDto: UpdateVeterinarioDto): Veterinario {
    const { nombreYApellido, telefono, direccion, email } = updateVeterinarioDto; // se entiende que la matricula y el dni de un veterinario, no cambia
    const veterinario = this.findOne(nroMatricula); // el nombre puede cambiarse por si cambia de género

    if (nombreYApellido) veterinario.nombreYApellido = nombreYApellido;
    if (telefono) veterinario.telefono = telefono;
    if (direccion) veterinario.direccion = direccion;
    if (email) veterinario.email = email;

    this.veterinarios = this.veterinarios.map(dbVeterinario => {
      if (dbVeterinario.nroMatricula === nroMatricula) return veterinario;
      return dbVeterinario;
    })
    return veterinario;
  }

  remove(nroMatricula: number) {
    this.findOne(nroMatricula);

    this.veterinarios = this.veterinarios.filter(veterinario => veterinario.nroMatricula !== nroMatricula);
  }
}
