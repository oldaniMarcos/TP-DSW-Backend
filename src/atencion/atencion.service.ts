import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAtencionDto } from './dto/create-atencion.dto';
import { UpdateAtencionDto } from './dto/update-atencion.dto';
import { Atencion } from './entities/atencion.entity.js';

@Injectable()
export class AtencionService {

  private atenciones: Atencion[] = [

    { idAtencion: 1, fechaHora: "2024-05-01T00:00:00.000Z", resultado: "res1", observaciones: "obs1" },
    { idAtencion: 2, fechaHora: "2024-05-02T00:00:00", resultado: "res2", observaciones: "obs2" },
    { idAtencion: 3, fechaHora: "2024-05-03", resultado: "res3", observaciones: "obs3" },

  ]


  create(createAtencionDto: CreateAtencionDto): Atencion {

    const atencion = new Atencion();
    atencion.idAtencion = Math.max(...this.atenciones.map((atencion) => atencion.idAtencion), 0) + 1;
    atencion.fechaHora = createAtencionDto.fechaHora;
    atencion.resultado = createAtencionDto.resultado;
    atencion.observaciones = createAtencionDto.observaciones;

    this.atenciones.push(atencion)

    return atencion;
  }

  findAll(): Atencion[] {
    return this.atenciones;
  }

  findOne(idAtencion: number): Atencion {

    const atencion = this.atenciones.find(atencion => atencion.idAtencion === idAtencion);

    if (!atencion) throw new NotFoundException(`Atencion con id ${idAtencion} no fue encontrada.`)

    return atencion;
  }

  update(idAtencion: number, updateAtencionDto: UpdateAtencionDto): Atencion {

    const { fechaHora, resultado, observaciones } = updateAtencionDto

    const atencion = this.findOne(idAtencion)

    if (fechaHora) atencion.fechaHora = fechaHora;
    if (resultado) atencion.resultado = resultado;
    if (observaciones) atencion.observaciones = observaciones;

    this.atenciones = this.atenciones.map(dbAtencion => {
      if (dbAtencion.idAtencion === idAtencion) return atencion;
      return dbAtencion;
    })

    return atencion;
  }

  remove(idAtencion: number) {

    this.findOne(idAtencion);

    this.atenciones = this.atenciones.filter(atencion => atencion.idAtencion !== idAtencion)

  }
}
