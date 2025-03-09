import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Raza } from '../raza/entities/raza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Cliente, Raza])],
  exports: [TypeOrmModule],
  controllers: [AnimalController],
  providers: [AnimalService],
})
export class AnimalModule { }
