import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';
import { Raza } from './entities/raza.entity';

@Injectable()
export class RazaService {
  private razas: Raza[] = [
    { codRaza: 1, descripcion: 'Golden' },
    { codRaza: 2, descripcion: 'Bulldog' },
    { codRaza: 3, descripcion: 'perro fiero' },
  ];

  create({ descripcion }: CreateRazaDto): Raza {
    const raza = new Raza();
    raza.codRaza = Math.max(...this.razas.map((raza) => raza.codRaza), 0) + 1;
    raza.descripcion = descripcion;
    this.razas.push(raza);
    return raza;
  }

  findAll(): Raza[] {
    return this.razas;
  }

  findOne(codRaza: number): Raza {
    const raza = this.razas.find((raza) => raza.codRaza === codRaza);
    if (!raza)
      throw new NotFoundException(
        `Raza con código de raza ${codRaza} no encontrada.`,
      );
    return raza;
  }

  update(codRaza: number, updateRazaDto: UpdateRazaDto): Raza {
    const { descripcion } = updateRazaDto;
    const raza = this.findOne(codRaza);
    if (descripcion) raza.descripcion = descripcion;
    this.razas = this.razas.map((dbRaza) => {
      if (dbRaza.codRaza === codRaza) return raza;
      return dbRaza;
    });
    return raza;
  }

  remove(codRaza: number) {
    this.findOne(codRaza);
    this.razas = this.razas.filter((raza) => raza.codRaza !== codRaza);
  }
}
