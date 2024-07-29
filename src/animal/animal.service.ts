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

  create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const animal = new Animal();
    animal.nombre = createAnimalDto.nombre;
    animal.fechaNac = createAnimalDto.fechaNac;
    animal.edad = createAnimalDto.edad;
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
