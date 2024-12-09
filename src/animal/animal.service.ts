import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Raza } from 'src/raza/entities/raza.entity';

@Injectable()
export class AnimalService {

  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Raza)
    private readonly razaRepository: Repository<Raza>
  ) { }

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {

    const { nombre, fechaNac, edad, idCliente, idRaza} = createAnimalDto

    const cliente = await this.clienteRepository.findOneBy({ id: idCliente })
    if(!cliente) throw new Error('Cliente no encontrado')

    const raza = await this.razaRepository.findOneBy({ codRaza: idRaza })
    if(!raza) throw new Error('Raza no encontrada')

    const animal = this.animalRepository.create({
      nombre,
      fechaNac,
      edad,
      cliente,
      raza
    })

    return this.animalRepository.save(animal)

  }

  async findAll(): Promise<Animal[]> {
    return this.animalRepository.find({relations: ['cliente','raza']});
  }

  findOne(nroHistClinica: number): Promise<Animal> {
    return this.animalRepository.findOneBy({ nroHistClinica: nroHistClinica })
  }

  async update(nroHistClinica: number, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {

    const { idCliente, idRaza, ...updateFields} = updateAnimalDto

    const animal = await this.animalRepository.findOneBy({ nroHistClinica })
    if(!animal) throw new Error('Animal no encontrado')

    if(idCliente) {
      const cliente = await this.clienteRepository.findOneBy({ id: idCliente })
      if(!cliente) throw new Error('Cliente no encontrado')
      animal.cliente = cliente
    }

    if (idRaza) {
      const raza = await this.razaRepository.findOneBy({ codRaza: idRaza });
      if (!raza) throw new Error('Raza no encontrada');
      animal.raza = raza;
    }

    Object.assign(animal, updateFields)

    return this.animalRepository.save(animal)
  }

  async remove(nroHistClinica: number): Promise<void> {
    await this.animalRepository.delete(nroHistClinica)
  }

  async findByClienteId(clienteId: number): Promise<Animal[]> {
    return this.animalRepository.find({ where: { cliente: { id: clienteId } } });
  }
}

