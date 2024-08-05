import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { Insumo } from './entities/insumo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InsumoService {

  constructor (
    @InjectRepository(Insumo)
    private readonly insumoRepository: Repository<Insumo>

  ) {}


  create(createInsumoDto: CreateInsumoDto): Promise<Insumo> {
    const insumo = new Insumo();
    insumo.descripcion = createInsumoDto.descripcion;
    insumo.stock = createInsumoDto.stock;
    insumo.fechaVencimiento = createInsumoDto.fechaVencimiento
    return this.insumoRepository.save(insumo);
  }

  async findAll(): Promise<Insumo[]> {
    return this.insumoRepository.find();
  }

  findOne(codInsumo: number): Promise<Insumo> {
    return this.insumoRepository.findOneBy({ codInsumo: codInsumo });
  }

  async update(codInsumo: number, updateInsumoDto: UpdateInsumoDto): Promise<Insumo> {
    await this.insumoRepository.update(codInsumo, updateInsumoDto)
    return this.insumoRepository.findOneBy({ codInsumo });
  }

  async remove(codInsumo: number): Promise<void> {
    await this.insumoRepository.delete(codInsumo)
  }
}
