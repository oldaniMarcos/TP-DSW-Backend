import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { Insumo } from './entities/insumo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoInsumo } from 'src/tipo-insumo/entities/tipo-insumo.entity';

@Injectable()
export class InsumoService {

  constructor (
    @InjectRepository(Insumo)
    private readonly insumoRepository: Repository<Insumo>,
    @InjectRepository(TipoInsumo)
    private readonly tipoInsumoRepository: Repository<TipoInsumo>

  ) {}


  async create(createInsumoDto: CreateInsumoDto): Promise<Insumo> {
    /*const insumo = new Insumo();
    insumo.descripcion = createInsumoDto.descripcion;
    insumo.stock = createInsumoDto.stock;
    insumo.fechaVencimiento = createInsumoDto.fechaVencimiento

    return this.insumoRepository.save(insumo);*/

    const { descripcion, stock, fechaVencimiento, idTipoInsumo } = createInsumoDto;
    const tipoInsumo = await this.tipoInsumoRepository.findOneBy({ codTipoInsumo: idTipoInsumo });

    if(!tipoInsumo) throw new Error("TipoInsumo no encontrado")
    
    const insumo = this.insumoRepository.create({
      descripcion,
      stock,
      fechaVencimiento,
      tipoInsumo
    });
    
    return this.insumoRepository.save(insumo);

  }

  async findAll(): Promise<Insumo[]> {
    return this.insumoRepository.find({ relations: ["tipoInsumo"]});
  }

  findOne(codInsumo: number): Promise<Insumo> {
    return this.insumoRepository.findOneBy({ codInsumo: codInsumo });
  }

  async update(codInsumo: number, updateInsumoDto: UpdateInsumoDto): Promise<Insumo> {
    
    /*
    await this.insumoRepository.update(codInsumo, updateInsumoDto)
    return this.insumoRepository.findOneBy({ codInsumo });
    */

    const { idTipoInsumo, ...updateFields } = updateInsumoDto;

    const insumo = await this.insumoRepository.findOneBy({ codInsumo });
    if (!insumo) {
      throw new Error('Insumo no encontrado');
    }

    // actualiza la relacion si se provee un tipo insumo
    if (idTipoInsumo) {
      const tipoInsumo = await this.tipoInsumoRepository.findOneBy({ codTipoInsumo: idTipoInsumo });
      if (!tipoInsumo) {
        throw new Error('TipoInsumo no fue encontrado');
      }
      insumo.tipoInsumo = tipoInsumo;
    }

    // actualiza el resto de los campos
    Object.assign(insumo, updateFields);

    return this.insumoRepository.save(insumo);
  }

  async remove(codInsumo: number): Promise<void> {
    await this.insumoRepository.delete(codInsumo)
  }

  async decreaseStock(codInsumo: number, cantidad: number): Promise<Insumo> {
    const insumo = await this.insumoRepository.findOneBy({ codInsumo });
    if (!insumo) {
      throw new Error(`Insumo no encontrado`);
    }

    if (insumo.stock < cantidad) {
      throw new Error(`Stock insuficiente para el insumo ${codInsumo}. Disponible: ${insumo.stock}, Pedido: ${cantidad}`);
    }

    insumo.stock -= cantidad;
    return this.insumoRepository.save(insumo);
  }
}
