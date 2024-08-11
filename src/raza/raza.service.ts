import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';
import { Raza } from './entities/raza.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RazaService {

  constructor(
    @InjectRepository(Raza)
    private readonly razaRepository: Repository<Raza>
  ) {}

  create(createRazaDto: CreateRazaDto): Promise<Raza> {
    const raza = new Raza();
    raza.descripcion = createRazaDto.descripcion;
    return this.razaRepository.save(raza);
  }

  async findAll(): Promise<Raza[]> {
    return this.razaRepository.find();
  }

  findOne(codRaza: number): Promise<Raza> {
    return this.razaRepository.findOneBy( {codRaza: codRaza} );
  }

  async update(codRaza: number, updateRazaDto: UpdateRazaDto): Promise<Raza> {
    await this.razaRepository.update(codRaza, updateRazaDto)
    return this.razaRepository.findOneBy({codRaza});
  }

  async remove(codRaza: number): Promise<void> {
    await this.razaRepository.delete(codRaza)
  }
}
