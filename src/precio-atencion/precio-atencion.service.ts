import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrecioAtencionDto } from './dto/create-precio-atencion.dto';
import { UpdatePrecioAtencionDto } from './dto/update-precio-atencion.dto';
import { PrecioAtencion } from './entities/precio-atencion.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PrecioAtencionService {

  constructor (
    @InjectRepository(PrecioAtencion)
    private readonly precioAtencionRepository: Repository<PrecioAtencion>
  ) {}

  create(createPrecioAtencionDto: CreatePrecioAtencionDto): Promise<PrecioAtencion> {

    const precioAtencion = new PrecioAtencion();
    precioAtencion.fechaDesde = createPrecioAtencionDto.fechaDesde;
    precioAtencion.valor = createPrecioAtencionDto.valor;

    return this.precioAtencionRepository.save(precioAtencion);
  }

  async findAll(): Promise<PrecioAtencion[]> {
    return this.precioAtencionRepository.find();
  }

  findOne(idPrecioAtencion: number): Promise<PrecioAtencion> {

    return this.precioAtencionRepository.findOneBy( {idPrecioAtencion: idPrecioAtencion} );
  }

  async update(idPrecioAtencion: number, updatePrecioAtencionDto: UpdatePrecioAtencionDto): Promise<PrecioAtencion> {
      await this.precioAtencionRepository.update(idPrecioAtencion, updatePrecioAtencionDto)
      return this.precioAtencionRepository.findOneBy( {idPrecioAtencion} );
  }

  async remove(idPrecioAtencion: number): Promise<void> {
    await this.precioAtencionRepository.delete(idPrecioAtencion)

  }

  async findMostRecent(): Promise<PrecioAtencion> {
    const [recent] = await this.precioAtencionRepository.find({
      order: {
        fechaDesde: "DESC"
      },
      take: 1
    });

    if (!recent) {
      throw new NotFoundException('No existen precios de atenciones')
    }
    return recent
  }
}
