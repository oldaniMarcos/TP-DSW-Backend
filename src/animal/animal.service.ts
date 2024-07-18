import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnimalService {

  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>
  ) { }

  /*
  private animales: Animal[] = [
    { id: 1, nroHistClinica: 1, nombre: 'Luli', fechaNac: '2016-03-20', edad: 8 },
    { id: 2, nroHistClinica: 2, nombre: 'Minino', fechaNac: '2014-10-17', edad: 9 },
    { id: 3, nroHistClinica: 1, nombre: 'Moqui', fechaNac: '2020-09-10', edad: 3 },
  ];
  */

  create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const animal = new Animal();
    //animal.nroHistClinica = Math.max(...this.animales.map((animal) => animal.nroHistClinica), 0) + 1;
    animal.nombre = createAnimalDto.nombre;
    animal.fechaNac = createAnimalDto.fechaNac;
    animal.edad = createAnimalDto.edad;
    //this.animales.push(animal);
    return this.animalRepository.save(animal);
  }

  async findAll(): Promise<Animal[]> {
    return this.animalRepository.find();
  }

  findOne(nroHistClinica: number): Promise<Animal> {
    return this.animalRepository.findOneBy({ nroHistClinica: nroHistClinica })
  }

  async update(nroHistClinica: number, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    await this.animalRepository.update(nroHistClinica, updateAnimalDto);
    return this.animalRepository.findOneBy({ nroHistClinica });
  }

  async remove(nroHistClinica: number): Promise<void> {
    await this.animalRepository.delete(nroHistClinica)
  }
}
