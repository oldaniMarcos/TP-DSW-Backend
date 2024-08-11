import { Module } from '@nestjs/common';
import { TipoInsumoService } from './tipo-insumo.service';
import { TipoInsumoController } from './tipo-insumo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoInsumo } from './entities/tipo-insumo.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([TipoInsumo])],
  exports: [TypeOrmModule],
  controllers: [TipoInsumoController],
  providers: [TipoInsumoService],
})
export class TipoInsumoModule {}
