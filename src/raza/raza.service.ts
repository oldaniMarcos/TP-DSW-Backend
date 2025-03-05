import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';
import { Raza } from './entities/raza.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especie } from 'src/especie/entities/especie.entity';

@Injectable()
export class RazaService {

  constructor(
    @InjectRepository(Raza)
    private readonly razaRepository: Repository<Raza>,
    @InjectRepository(Especie)
    private readonly especieRepository: Repository<Especie>
  ) {}

  async create(createRazaDto: CreateRazaDto): Promise<Raza> {
    const { descripcion, idEspecie } = createRazaDto;
    const especie = await this.especieRepository.findOneBy({ codEspecie: idEspecie });

    if(!especie) throw new Error("Especie no encontrada")
  
    const raza = this.razaRepository.create({
      descripcion,
      especie
    });

    return this.razaRepository.save(raza)
    
  }

  async findAll(): Promise<Raza[]> {
    return this.razaRepository.find({relations: ["especie"]});
  }

  findOne(codRaza: number): Promise<Raza> {
    return this.razaRepository.findOneBy( {codRaza: codRaza} );
  }

  async update(codRaza: number, updateRazaDto: UpdateRazaDto): Promise<Raza> {
    const { idEspecie, ...updateFields} = updateRazaDto

    const raza = await this.razaRepository.findOneBy({ codRaza })
    if(!raza) {
      throw new Error('Raza no encontrada')
    }

    if (idEspecie) {
      const especie = await this.especieRepository.findOneBy({ codEspecie: idEspecie });
      if (!especie) {
        throw new Error('Especie no fue encontrada');
      }
      raza.especie = especie;
    }

    // actualiza el resto de los campos
    Object.assign(raza, updateFields);

    return this.razaRepository.save(raza);
  }

  async findEspecie(codRaza: number): Promise<Especie> {
    const raza = await this.razaRepository.findOne({
      where: { codRaza },
      relations: ['especie'],
    });
  
    if (!raza) {
      throw new Error('Raza no encontrada');
    }
  
    return raza.especie;
  }

  async remove(codRaza: number): Promise<void> {
    await this.razaRepository.delete(codRaza)
  }

  async hasRazaWithEspecie(id: number): Promise<boolean> {
    const count = await this.razaRepository.count({
      where: { especie: { codEspecie: id } }
    });
  
    return count > 0;
  }  
}
