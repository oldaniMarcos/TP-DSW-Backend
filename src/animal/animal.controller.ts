import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity.js';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto): Animal {
    return this.animalService.create(createAnimalDto);
  }

  @Get()
  findAll(): Animal[] {
    return this.animalService.findAll();
  }

  @Get(':nroHistClinica')
  findOne(@Param('nroHistClinica') nroHistClinica: number): Animal {
    return this.animalService.findOne(nroHistClinica);
  }

  @Patch(':nroHistClinica')
  update(@Param('nroHistClinica') nroHistClinica: number, @Body() updateAnimalDto: UpdateAnimalDto): Animal {
    return this.animalService.update(nroHistClinica, updateAnimalDto);
  }

  @Delete(':nroHistClinica')
  remove(@Param('nroHistClinica') nroHistClinica: number) {
    return this.animalService.remove(nroHistClinica);
  }
}
