import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrecioInsumoDto } from './dto/create-precio-insumo.dto';
import { UpdatePrecioInsumoDto } from './dto/update-precio-insumo.dto';
import { PrecioInsumo } from './entities/precio-insumo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Insumo } from 'src/insumo/entities/insumo.entity';

@Injectable()
export class PrecioInsumoService {

  constructor(
    @InjectRepository(PrecioInsumo)
    private readonly precioInsumoRepository: Repository<PrecioInsumo>,
    @InjectRepository(Insumo)
    private readonly insumoRepository: Repository<Insumo>
  ) {}

  async create(createPrecioInsumoDto: CreatePrecioInsumoDto): Promise<PrecioInsumo> {

    const { fechaDesde, valor, valorVenta, idInsumo} = createPrecioInsumoDto;
    const insumo = await this.insumoRepository.findOneBy({ codInsumo: idInsumo });

    if(!insumo) throw new Error("Insumo no encontrado")
    
    const precioInsumo = this.precioInsumoRepository.create({
      fechaDesde,
      valor,
      valorVenta,
      insumo
    });

    return this.precioInsumoRepository.save(precioInsumo);
  }

  async findAll(): Promise<PrecioInsumo[]> {
    return this.precioInsumoRepository.find({relations: ['insumo']});
  }

  findOne(codPrecioInsumo: number): Promise<PrecioInsumo> {
    return this.precioInsumoRepository.findOneBy( {codPrecioInsumo: codPrecioInsumo} );
  }

  async update(
    codPrecioInsumo: number, updatePrecioInsumoDto: UpdatePrecioInsumoDto): Promise<PrecioInsumo> {

    const { idInsumo, ...updateFields } = updatePrecioInsumoDto;

    const precioInsumo = await this.precioInsumoRepository.findOneBy({ codPrecioInsumo });
    if (!precioInsumo) {
      throw new Error('PrecioInsumo no encontrado');
    }

    if (idInsumo) {
      const insumo = await this.insumoRepository.findOneBy({ codInsumo: idInsumo });
      if (!insumo) {
        throw new Error('Insumo no encontrado');
      }
      precioInsumo.insumo = insumo;
    }

    Object.assign(precioInsumo, updateFields);

    return this.precioInsumoRepository.save(precioInsumo);
  }

  async remove(codPrecioInsumo: number): Promise<void> {
    await this.precioInsumoRepository.delete(codPrecioInsumo)
  }

  async findMostRecentByInsumo(idInsumo: number): Promise<PrecioInsumo> {
      const recent = await this.precioInsumoRepository.findOne({
        where: { insumo: { codInsumo: idInsumo } },
        order: {
          fechaDesde: "DESC"
        },
        relations: ['insumo'],
      });
  
      if (!recent) {
        throw new NotFoundException(`No existen precios de insumos para el insumo con ID ${idInsumo}`);
      }
      return recent
    }
}
