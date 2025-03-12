import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) { }

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto): Promise<Animal> {
    return this.animalService.create(createAnimalDto);
  }

  @Get()
  findAll(): Promise<Animal[]> {
    return this.animalService.findAll();
  }

  @Get(':nroHistClinica')
  findOne(@Param('nroHistClinica') nroHistClinica: number): Promise<Animal> {
    return this.animalService.findOne(nroHistClinica);
  }


  @Patch(':nroHistClinica')
  async update(@Param('nroHistClinica') nroHistClinica: number, @Body() updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    return this.animalService.update(nroHistClinica, updateAnimalDto);
  }


  @Delete(':nroHistClinica')
  remove(@Param('nroHistClinica') nroHistClinica: number): Promise<void> {
    return this.animalService.remove(nroHistClinica);
  }

  @Get('cliente/:clienteId')
  findByClienteId(@Param('clienteId') clienteId: number): Promise<Animal[]> {
    return this.animalService.findByClienteId(clienteId);
  }

  @Get('exists/cliente/:id')
  async clienteHasAnimal(@Param('id') idCliente: number): Promise<{ exists: boolean }> {
  const exists = await this.animalService.clienteHasAnimal(idCliente);
  return { exists };
}
}
