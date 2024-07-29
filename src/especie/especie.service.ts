import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { Especie } from './entities/especie.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EspecieService {

  constructor(
    @InjectRepository(Especie)
    private readonly especieRepository: Repository<Especie>
  ) { }

  create(createEspecieDto: CreateEspecieDto): Promise<Especie> {
    const especie = new Especie();
    especie.descripcion = createEspecieDto.descripcion;
    return this.especieRepository.save(especie);
  }


  async findAll(): Promise<Especie[]> {
    return this.especieRepository.find()
  }

  findOne(codEspecie: number): Promise<Especie> {
    return this.especieRepository.findOneBy({ codEspecie: codEspecie })
  }

  async update(codEspecie: number, updateEspecieDto: UpdateEspecieDto): Promise<Especie> {
    await this.especieRepository.update(codEspecie, updateEspecieDto);
    return this.especieRepository.findOneBy({ codEspecie })
  }

  async remove(codEspecie: number): Promise<void> {
    await this.especieRepository.delete(codEspecie)
  }
}
