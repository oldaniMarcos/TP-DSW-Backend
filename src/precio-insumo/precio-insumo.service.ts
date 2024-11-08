import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrecioInsumoDto } from './dto/create-precio-insumo.dto';
import { UpdatePrecioInsumoDto } from './dto/update-precio-insumo.dto';
import { PrecioInsumo } from './entities/precio-insumo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PrecioInsumoService {

  constructor(
    @InjectRepository(PrecioInsumo)
    private readonly precioInsumoRepository: Repository<PrecioInsumo>
  ) {}

  create(createPrecioInsumoDto: CreatePrecioInsumoDto): Promise<PrecioInsumo> {
    const precioInsumo = new PrecioInsumo();
    precioInsumo.fechaDesde = createPrecioInsumoDto.fechaDesde;
    precioInsumo.valor = createPrecioInsumoDto.valor;
    precioInsumo.valorVenta = createPrecioInsumoDto.valor;

    return this.precioInsumoRepository.save(precioInsumo);
  }

  async findAll(): Promise<PrecioInsumo[]> {
    return this.precioInsumoRepository.find();
  }

  findOne(codPrecioInsumo: number): Promise<PrecioInsumo> {
    return this.precioInsumoRepository.findOneBy( {codPrecioInsumo: codPrecioInsumo} );
  }

  async update(
    codPrecioInsumo: number, updatePrecioInsumoDto: UpdatePrecioInsumoDto): Promise<PrecioInsumo> {
    await this.precioInsumoRepository.update(codPrecioInsumo, updatePrecioInsumoDto)
    return this.precioInsumoRepository.findOneBy( {codPrecioInsumo} );
  }

  async remove(codPrecioInsumo: number): Promise<void> {
    await this.precioInsumoRepository.delete(codPrecioInsumo)
  }
}
