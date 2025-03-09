import { Module } from '@nestjs/common';
import { RazaService } from './raza.service';
import { RazaController } from './raza.controller';
import { Raza } from './entities/raza.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especie } from '../especie/entities/especie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Raza, Especie])],
  exports: [TypeOrmModule],
  controllers: [RazaController],
  providers: [RazaService],
})
export class RazaModule {}
