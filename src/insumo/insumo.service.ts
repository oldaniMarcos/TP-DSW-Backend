import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { Insumo } from './entities/insumo.entity';

@Injectable()
export class InsumoService {
  private insumos: Insumo[] = [
    {
      codInsumo: 1,
      descripcion: 'Comilona',
      stock: 30,
      fechaVencimiento: '2024-10-25',
    },
    {
      codInsumo: 2,
      descripcion: 'Vacuna vencida',
      stock: 0,
      fechaVencimiento: '2006-0-12',
    },
    {
      codInsumo: 3,
      descripcion: 'Vacuna disponible',
      stock: 15,
      fechaVencimiento: '2025-7-8',
    },
  ];

  create({ descripcion, stock }: CreateInsumoDto): Insumo {
    const insumo = new Insumo();
    insumo.codInsumo =
      Math.max(...this.insumos.map((insumo) => insumo.codInsumo), 0) + 1;
    insumo.descripcion = descripcion;
    insumo.stock = stock;
    this.insumos.push(insumo);
    return insumo;
  }

  findAll(): Insumo[] {
    return this.insumos;
  }

  findOne(codInsumo: number): Insumo {
    const insumo = this.insumos.find(
      (insumo) => insumo.codInsumo === codInsumo,
    );
    if (!insumo)
      throw new NotFoundException(
        `Insumo con código de insumo ${codInsumo} no encontrado.`,
      );
    return insumo;
  }

  update(codInsumo: number, updateInsumoDto: UpdateInsumoDto): Insumo {
    const { descripcion, stock, fechaVencimiento } = updateInsumoDto;
    const insumo = this.findOne(codInsumo);
    if (descripcion) insumo.descripcion = descripcion;
    if (stock) insumo.stock = stock;
    if (fechaVencimiento) insumo.fechaVencimiento = fechaVencimiento;
    this.insumos = this.insumos.map((dbInsumo) => {
      if (dbInsumo.codInsumo === codInsumo) return insumo;
      return dbInsumo;
    });
    return insumo;
  }

  remove(codInsumo: number) {
    this.findOne(codInsumo);
    this.insumos = this.insumos.filter(
      (insumo) => insumo.codInsumo !== codInsumo,
    );
  }
}
