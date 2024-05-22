import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoInsumoDto } from './dto/create-tipo-insumo.dto';
import { UpdateTipoInsumoDto } from './dto/update-tipo-insumo.dto';
import { TipoInsumo } from './entities/tipo-insumo.entity';

@Injectable()
export class TipoInsumoService {
  private tipoInsumos: TipoInsumo[] = [
    {
      codTipoInsumo: 1,
      descripcion: 'Vacuna',
    },
    {
      codTipoInsumo: 2,
      descripcion: 'Correa',
    },
    {
      codTipoInsumo: 3,
      descripcion: 'Medicacion',
    },
  ];
  create({ descripcion }: CreateTipoInsumoDto): TipoInsumo {
    const tipoInsumo = new TipoInsumo();
    tipoInsumo.codTipoInsumo =
      Math.max(
        ...this.tipoInsumos.map((tipoInsumo) => tipoInsumo.codTipoInsumo),
        0,
      ) + 1;
    tipoInsumo.descripcion = descripcion;
    this.tipoInsumos.push(tipoInsumo);
    return tipoInsumo;
  }

  findAll(): TipoInsumo[] {
    return this.tipoInsumos;
  }

  findOne(codTipoInsumo: number): TipoInsumo {
    const tipoInsumo = this.tipoInsumos.find(
      (tipoInsumo) => tipoInsumo.codTipoInsumo === codTipoInsumo,
    );
    if (!tipoInsumo)
      throw new NotFoundException(
        `Insumo con código de insumo ${codTipoInsumo} no encontrado.`,
      );
    return tipoInsumo;
  }

  update(
    codTipoInsumo: number,
    updateTipoInsumoDto: UpdateTipoInsumoDto,
  ): TipoInsumo {
    const { descripcion } = updateTipoInsumoDto;
    const tipoInsumo = this.findOne(codTipoInsumo);
    if (descripcion) tipoInsumo.descripcion = descripcion;
    this.tipoInsumos = this.tipoInsumos.map((dbTipoInsumo) => {
      if (dbTipoInsumo.codTipoInsumo === codTipoInsumo) return tipoInsumo;
      return dbTipoInsumo;
    });
    return tipoInsumo;
  }

  remove(codTipoInsumo: number) {
    this.findOne(codTipoInsumo);
    this.tipoInsumos = this.tipoInsumos.filter(
      (tipoInsumo) => tipoInsumo.codTipoInsumo !== codTipoInsumo,
    );
  }
}
