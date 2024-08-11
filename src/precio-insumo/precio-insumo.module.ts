import { Module } from '@nestjs/common';
import { PrecioInsumoService } from './precio-insumo.service';
import { PrecioInsumoController } from './precio-insumo.controller';
import { PrecioInsumo } from './entities/precio-insumo.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PrecioInsumo])],
  exports: [TypeOrmModule],
  controllers: [PrecioInsumoController],
  providers: [PrecioInsumoService],
})
export class PrecioInsumoModule {}
