import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { Especie } from './entities/especie.entity.js';

@Injectable()
export class EspecieService {

  private especies: Especie[] = [
    { codEspecie: 1, descripcion: 'Perro' }, 
    { codEspecie: 2, descripcion: 'Gato' },
    { codEspecie: 3, descripcion: 'Pajaro' }
  ];

  create(createEspecieDto: CreateEspecieDto): Especie {
    const especie = new Especie();
    especie.codEspecie = Math.max(...this.especies.map((especie) => especie.codEspecie), 0) + 1;
    especie.descripcion = createEspecieDto.descripcion;
    this.especies.push(especie);
    return especie;
  }


  findAll(): Especie[] {
    return this.especies;
  }

  findOne(codEspecie: number): Especie {
    const especie = this.especies.find(especie => especie.codEspecie === codEspecie)

    if (!especie) throw new NotFoundException(`Especie con código ${codEspecie} no fue encontrada`)

    return especie;
  }

  update(codEspecie: number, updateEspecieDto: UpdateEspecieDto): Especie {
    const { descripcion } = updateEspecieDto;
    const especie = this.findOne(codEspecie);

    if (descripcion) especie.descripcion = descripcion;

    this.especies = this.especies.map(dbEspecie => {
      if (dbEspecie.codEspecie === codEspecie) return especie;
      return dbEspecie;
    })
    return especie;
  }

  remove(codEspecie: number) {
    this.findOne(codEspecie);

    this.especies = this.especies.filter(especie => especie.codEspecie !== codEspecie);
  }
}
