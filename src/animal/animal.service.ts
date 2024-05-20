import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity.js';

@Injectable()
export class AnimalService {

  private animales: Animal[] = [
    { nroHistClinica: 1, nombre: 'Luli', fechaNac: '2016-03-20', edad: 8 }, 
    { nroHistClinica: 2, nombre: 'Minino', fechaNac: '2014-10-17', edad: 9 }, 
    { nroHistClinica: 1, nombre: 'Moqui', fechaNac: '2020-09-10', edad: 3 }, 
  ];

  create(createAnimalDto: CreateAnimalDto): Animal {
    const animal = new Animal();
    animal.nroHistClinica = Math.max(...this.animales.map((animal) => animal.nroHistClinica), 0) + 1;
    animal.nombre = createAnimalDto.nombre;
    animal.fechaNac = createAnimalDto.fechaNac;
    animal.edad = createAnimalDto.edad;
    this.animales.push(animal);
    return animal;
  }

  findAll(): Animal[] {
    return this.animales;
  }

  findOne(nroHistClinica: number): Animal {
    const animal = this.animales.find(animal => animal.nroHistClinica === nroHistClinica)

    if (!animal) throw new NotFoundException (`Animal con historia clínica ${nroHistClinica} no fue encontrada`)

    return animal;
  }

  update(nroHistClinica: number, updateAnimalDto: UpdateAnimalDto): Animal {
    const { fechaNac, edad } = updateAnimalDto;
    const animal = this.findOne(nroHistClinica);

    if (fechaNac) animal.fechaNac = fechaNac;
    if (edad) animal.edad = edad;

    this.animales = this.animales.map(dbAnimal => {
      if (dbAnimal.nroHistClinica === nroHistClinica) return animal;
      return dbAnimal;
    })
    return animal;
  }

  remove(nroHistClinica: number) {
    this.findOne(nroHistClinica);

    this.animales = this.animales.filter(animal => animal.nroHistClinica !== nroHistClinica);
  }
}
