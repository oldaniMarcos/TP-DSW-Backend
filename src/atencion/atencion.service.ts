import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAtencionDto } from './dto/create-atencion.dto';
import { UpdateAtencionDto } from './dto/update-atencion.dto';
import { Atencion } from './entities/atencion.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AtencionService {

  constructor(
    @InjectRepository(Atencion)
    private readonly atencionRepository: Repository<Atencion>
  ) { }

  create(createAtencionDto: CreateAtencionDto): Promise<Atencion> {

    const atencion = new Atencion();
    atencion.fechaHora = createAtencionDto.fechaHora;
    atencion.resultado = createAtencionDto.resultado;
    atencion.observaciones = createAtencionDto.observaciones;

    return this.atencionRepository.save(atencion);
  }

  async findAll(): Promise<Atencion[]> {
    return this.atencionRepository.find();
  }

  findOne(idAtencion: number): Promise<Atencion> {
    return this.atencionRepository.findOneBy({ idAtencion: idAtencion })
  }

  async update(idAtencion: number, updateAtencionDto: UpdateAtencionDto): Promise<Atencion> {
    await this.atencionRepository.update(idAtencion, updateAtencionDto);
    return this.atencionRepository.findOneBy({ idAtencion })
  }

  async remove(idAtencion: number): Promise<void> {
    await this.atencionRepository.delete(idAtencion)
  }
}
