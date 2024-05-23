import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrecioInsumoDto } from './dto/create-precio-insumo.dto';
import { UpdatePrecioInsumoDto } from './dto/update-precio-insumo.dto';
import { PrecioInsumo } from './entities/precio-insumo.entity';

@Injectable()
export class PrecioInsumoService {
  private preciosInsumos: PrecioInsumo[] = [
    {
      codPrecioInsumo: 1,
      codInsumo: 1,
      fechaDesde: '2024-01-01',
      valor: 100,
      valorVenta: 200,
    },
    {
      codPrecioInsumo: 2,
      codInsumo: 1,
      fechaDesde: '2024-02-25',
      valor: 150,
      valorVenta: 2000,
    },
    {
      codPrecioInsumo: 3,
      codInsumo: 4,
      fechaDesde: '2024-01-10',
      valor: 75,
      valorVenta: 60,
    },
  ];

  create(createPrecioInsumoDto: CreatePrecioInsumoDto): PrecioInsumo {
    const precioInsumo = new PrecioInsumo();
    precioInsumo.codPrecioInsumo =
      Math.max(
        ...this.preciosInsumos.map(
          (precioInsumo) => precioInsumo.codPrecioInsumo,
        ),
        0,
      ) + 1;
    precioInsumo.codInsumo = createPrecioInsumoDto.codInsumo;
    precioInsumo.fechaDesde = createPrecioInsumoDto.fechaDesde;
    precioInsumo.valor = createPrecioInsumoDto.valor;
    precioInsumo.valorVenta = createPrecioInsumoDto.valor;

    this.preciosInsumos.push(precioInsumo);

    return precioInsumo;
  }

  findAll(): PrecioInsumo[] {
    return this.preciosInsumos;
  }

  findOne(codPrecioInsumo: number): PrecioInsumo {
    const precioInsumo = this.preciosInsumos.find(
      (precioInsumo) => precioInsumo.codPrecioInsumo === codPrecioInsumo,
    );

    if (!precioInsumo)
      throw new NotFoundException(
        `PrecioInsumo con código ${codPrecioInsumo} no fue encontrado.`,
      );

    return precioInsumo;
  }

  update(
    codPrecioInsumo: number,
    updatePrecioInsumoDto: UpdatePrecioInsumoDto,
  ): PrecioInsumo {
    const { codInsumo, fechaDesde, valor, valorVenta } = updatePrecioInsumoDto;

    const precioInsumo = this.findOne(codPrecioInsumo);

    if (codInsumo) precioInsumo.codInsumo = codInsumo;
    if (fechaDesde) precioInsumo.fechaDesde = fechaDesde;
    if (valor) precioInsumo.valor = valor;
    if (valorVenta) precioInsumo.valorVenta = valorVenta;

    this.preciosInsumos = this.preciosInsumos.map((dbPreciosInsumos) => {
      if (dbPreciosInsumos.codPrecioInsumo === codPrecioInsumo)
        return precioInsumo;
      return dbPreciosInsumos;
    });

    return precioInsumo;
  }

  remove(codPrecioInsumo: number) {
    this.findOne(codPrecioInsumo);

    this.preciosInsumos = this.preciosInsumos.filter(
      (precioInsumo) => precioInsumo.codPrecioInsumo !== codPrecioInsumo,
    );
  }
}
