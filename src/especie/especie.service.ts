import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { Especie } from './entities/especie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Raza } from '../raza/entities/raza.entity';

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

  async findRazasByEspecieId(codEspecie: number): Promise<Raza[]> {
    const especie = await this.especieRepository.findOne({
      where: { codEspecie },
      relations: ['razas'], // Asegúrate de incluir la relación con razas
    });

    if (!especie) {
      throw new NotFoundException('Especie no encontrada');
    }

    return especie.razas; // Devuelve las razas asociadas a la especie
  }
}
