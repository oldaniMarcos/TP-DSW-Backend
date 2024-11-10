import { Module } from '@nestjs/common';
import { RazaService } from './raza.service';
import { RazaController } from './raza.controller';
import { Raza } from './entities/raza.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especie } from 'src/especie/entities/especie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Raza, Especie])],
  exports: [TypeOrmModule],
  controllers: [RazaController],
  providers: [RazaService],
})
export class RazaModule {}
