import { Module } from '@nestjs/common';
import { PrecioInsumoService } from './precio-insumo.service';
import { PrecioInsumoController } from './precio-insumo.controller';
import { PrecioInsumo } from './entities/precio-insumo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insumo } from '../insumo/entities/insumo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrecioInsumo, Insumo])],
  exports: [TypeOrmModule],
  controllers: [PrecioInsumoController],
  providers: [PrecioInsumoService],
})
export class PrecioInsumoModule {}
