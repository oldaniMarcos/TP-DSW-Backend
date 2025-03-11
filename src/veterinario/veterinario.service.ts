import { Injectable } from '@nestjs/common';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import { Veterinario } from './entities/veterinario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VeterinarioService {

  constructor(
    @InjectRepository(Veterinario)
    private readonly veterinarioRepository: Repository<Veterinario>
  ) {}

  create(createVeterinarioDto: CreateVeterinarioDto): Promise<Veterinario> {
    const veterinario = new Veterinario();
    veterinario.nroMatricula = createVeterinarioDto.nroMatricula;
    veterinario.dni = createVeterinarioDto.dni;
    veterinario.nombreYApellido = createVeterinarioDto.nombreYApellido;
    veterinario.telefono = createVeterinarioDto.telefono;
    veterinario.direccion = createVeterinarioDto.direccion;
    veterinario.email = createVeterinarioDto.email;

    return this.veterinarioRepository.save(veterinario);
  }

  async findAll(): Promise<Veterinario[]> {
    return this.veterinarioRepository.find();
  }

  findOne(idVeterinario: number): Promise<Veterinario> {
    return this.veterinarioRepository.findOneBy( {idVeterinario: idVeterinario} );
  }

  async update(idVeterinario: number, updateVeterinarioDto: UpdateVeterinarioDto): Promise<Veterinario> {
    await this.veterinarioRepository.update(idVeterinario, updateVeterinarioDto)
    return this.veterinarioRepository.findOneBy({idVeterinario});
  }

  async remove(idVeterinario: number): Promise<void> {
    await this.veterinarioRepository.delete(idVeterinario)
  }

  async checkExistingFields(dni: string, email: string, nroMatricula: string) {

    let existingDni = await this.veterinarioRepository.query(
      'SELECT * FROM veterinario WHERE dni = ?',
      [dni]
    )
    let existingNroMatricula = await this.veterinarioRepository.query(
      'SELECT * FROM veterinario WHERE nroMatricula = ?',
      [nroMatricula]
    )
    let existingEmail = await this.veterinarioRepository.query(
      'SELECT * FROM veterinario WHERE email = ?',
      [email]
    )   
  
    return { 
      dni: existingDni.length > 0, 
      email: existingEmail.length > 0, 
      nroMatricula: existingNroMatricula.length > 0 
    };
  }  
}
