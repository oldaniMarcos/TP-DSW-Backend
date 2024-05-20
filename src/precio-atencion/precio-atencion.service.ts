import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrecioAtencionDto } from './dto/create-precio-atencion.dto';
import { UpdatePrecioAtencionDto } from './dto/update-precio-atencion.dto';
import { PrecioAtencion } from './entities/precio-atencion.entity.js';

@Injectable()
export class PrecioAtencionService {

  private preciosAtenciones: PrecioAtencion[] = [
    { idPrecioAtencion: 1, idAtencion: 1, fechaDesde: "2024-01-01", valor: 100 },
    { idPrecioAtencion: 2, idAtencion: 2, fechaDesde: "2024-02-25", valor: 150 },
    { idPrecioAtencion: 3, idAtencion: 3, fechaDesde: "2024-01-10", valor: 75 },
  ]


  create(createPrecioAtencionDto: CreatePrecioAtencionDto): PrecioAtencion {

    const precioAtencion = new PrecioAtencion();
    precioAtencion.idPrecioAtencion = Math.max(...this.preciosAtenciones.map((precioAtencion) => precioAtencion.idPrecioAtencion), 0) + 1;
    precioAtencion.idAtencion = createPrecioAtencionDto.idAtencion;
    precioAtencion.fechaDesde = createPrecioAtencionDto.fechaDesde;
    precioAtencion.valor = createPrecioAtencionDto.valor;

    this.preciosAtenciones.push(precioAtencion);

    return precioAtencion;
  }

  findAll(): PrecioAtencion[] {
    return this.preciosAtenciones;
  }

  findOne(idPrecioAtencion: number): PrecioAtencion {

    const precioAtencion = this.preciosAtenciones.find(precioAtencion => precioAtencion.idPrecioAtencion === idPrecioAtencion);

    if (!precioAtencion) throw new NotFoundException(`PrecioAtencion con id ${idPrecioAtencion} no fue encontrada.`);

    return precioAtencion;
  }

  update(idPrecioAtencion: number, updatePrecioAtencionDto: UpdatePrecioAtencionDto): PrecioAtencion {

    const { idAtencion, fechaDesde, valor } = updatePrecioAtencionDto;

    const precioAtencion = this.findOne(idPrecioAtencion);

    if (idAtencion) precioAtencion.idAtencion = idAtencion;
    if (fechaDesde) precioAtencion.fechaDesde = fechaDesde;
    if (valor) precioAtencion.valor = valor;

    this.preciosAtenciones = this.preciosAtenciones.map(dbPreciosAtenciones => {
      if (dbPreciosAtenciones.idPrecioAtencion === idPrecioAtencion) return precioAtencion;
      return dbPreciosAtenciones;
    })

    return precioAtencion;
  }

  remove(idPrecioAtencion: number) {

    this.findOne(idPrecioAtencion);

    this.preciosAtenciones = this.preciosAtenciones.filter(precioAtencion => precioAtencion.idPrecioAtencion !== idPrecioAtencion)

  }
}
