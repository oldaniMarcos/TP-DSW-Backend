import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoInsumoDto } from './dto/create-tipo-insumo.dto';
import { UpdateTipoInsumoDto } from './dto/update-tipo-insumo.dto';
import { TipoInsumo } from './entities/tipo-insumo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TipoInsumoService {

  constructor(
    @InjectRepository(TipoInsumo)
    private readonly tipoInsumoRepository: Repository<TipoInsumo>
  ) {}

  create(createTipoInsumoDto: CreateTipoInsumoDto): Promise<TipoInsumo> {
    const tipoInsumo = new TipoInsumo();
    tipoInsumo.descripcion = createTipoInsumoDto.descripcion;
    return this.tipoInsumoRepository.save(tipoInsumo);
  }

  async findAll(): Promise<TipoInsumo[]> {
    return this.tipoInsumoRepository.find();
  }

  findOne(codTipoInsumo: number): Promise<TipoInsumo> {
    return this.tipoInsumoRepository.findOneBy( {codTipoInsumo: codTipoInsumo} );
  }

  async update(codTipoInsumo: number, updateTipoInsumoDto: UpdateTipoInsumoDto): Promise<TipoInsumo> {
    await this.tipoInsumoRepository.update(codTipoInsumo, updateTipoInsumoDto)
    return this.tipoInsumoRepository.findOneBy({codTipoInsumo});
  }

  async remove(codTipoInsumo: number): Promise<void> {
    await this.tipoInsumoRepository.delete(codTipoInsumo)
  }
}
