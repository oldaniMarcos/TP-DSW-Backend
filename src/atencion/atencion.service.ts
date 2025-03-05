import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAtencionDto } from './dto/create-atencion.dto';
import { UpdateAtencionDto } from './dto/update-atencion.dto';
import { Atencion } from './entities/atencion.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from 'src/animal/entities/animal.entity';
import { PrecioAtencion } from 'src/precio-atencion/entities/precio-atencion.entity';
import { Veterinario } from 'src/veterinario/entities/veterinario.entity';
import { Insumo } from 'src/insumo/entities/insumo.entity';

@Injectable()
export class AtencionService {

  constructor(
    @InjectRepository(Atencion)
    private readonly atencionRepository: Repository<Atencion>,
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
    @InjectRepository(PrecioAtencion)
    private readonly precioAtencionRepository: Repository<PrecioAtencion>,
    @InjectRepository(Veterinario)
    private readonly veterinarioRepository: Repository<Veterinario>,
    @InjectRepository(Insumo)
    private readonly insumoRepository: Repository<Insumo>
  ) { }

  async create(createAtencionDto: CreateAtencionDto): Promise<Atencion> {

    const {idAnimal, idPrecio, idVeterinario, idsInsumos, fechaHora, resultado, observaciones, valor} = createAtencionDto
    const animal = await this.animalRepository.findOneBy({nroHistClinica:idAnimal})
    const precioAtencion = await this.precioAtencionRepository.findOneBy({idPrecioAtencion:idPrecio})
    const veterinario = await this.veterinarioRepository.findOneBy({idVeterinario:idVeterinario})

    if (!animal || !precioAtencion || !veterinario) {
      throw new Error("Alguna entidad relacionada no fue encontrada")
    }

    const insumos = await this.insumoRepository.findByIds(idsInsumos)
    const atencion = this.atencionRepository.create({
      fechaHora,
      resultado,
      observaciones,
      valor,
      animal,
      precioAtencion,
      veterinario, 
      insumos
    })
    
    return this.atencionRepository.save(atencion);
  }

  async findAll(): Promise<Atencion[]> {
    return this.atencionRepository.find({relations:['animal','precioAtencion', 'veterinario', 'insumos']});
  }

  findOne(idAtencion: number): Promise<Atencion> {
    return this.atencionRepository.findOneBy({ idAtencion: idAtencion })
  }

  async update(idAtencion: number, updateAtencionDto: UpdateAtencionDto): Promise<Atencion> {
    const { idAnimal, idPrecio, idVeterinario, idsInsumos, ...updateFields } = updateAtencionDto;

  const atencion = await this.atencionRepository.findOne({
    where: { idAtencion },
    relations: ['animal', 'precioAtencion', 'veterinario', 'insumos'],
    });
  
  if (!atencion) {
    throw new Error('Atencion no encontrada');
    }

  if (idAnimal) {
    const animal = await this.animalRepository.findOneBy({nroHistClinica:idAnimal});
    if (!animal) throw new Error('Animal no encontrado');
    atencion.animal = animal;
    }

  if (idPrecio) {
    const precioAtencion = await this.precioAtencionRepository.findOneBy({idPrecioAtencion:idPrecio});
    if (!precioAtencion) throw new Error('PrecioAtencion no encontrado');
    atencion.precioAtencion = precioAtencion;
    }

  if (idVeterinario) {
    const veterinario = await this.veterinarioRepository.findOneBy({idVeterinario:idVeterinario});
    if (!veterinario) throw new Error('Veterinario no encontrado');
    atencion.veterinario = veterinario;
  }

  if (idsInsumos) {
    const insumos = await this.insumoRepository.findByIds(idsInsumos);
    if (insumos.length !== idsInsumos.length) throw new Error('Algunas IDs de Insumos no fueron encontradas');
    atencion.insumos = insumos;
  }

  Object.assign(atencion, updateFields);

  return this.atencionRepository.save(atencion);
  }

  async remove(idAtencion: number): Promise<void> {
    await this.atencionRepository.delete(idAtencion)
  }

  async findByClienteId(clienteId: number): Promise<Atencion[]> {
    return this.atencionRepository.find({
      relations: ['animal', 'animal.cliente', 'precioAtencion', 'veterinario', 'insumos'],
      where: { animal: { cliente: { id: clienteId } } },
    });
  }

  async hasAtencionWithAnimal(id: number): Promise<boolean> {
    const count = await this.atencionRepository.count({
      where: { animal: { nroHistClinica: id } }
    });
  
    return count > 0;
  }

  async hasAtencionWithVeterinario(id: number): Promise<boolean> {
    const count = await this.atencionRepository.count({
      where: { veterinario: { idVeterinario: id } }
    });
  
    return count > 0;
  }
}
