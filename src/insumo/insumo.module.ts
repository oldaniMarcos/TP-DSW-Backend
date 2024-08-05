import { Module } from '@nestjs/common';
import { InsumoService } from './insumo.service';
import { InsumoController } from './insumo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insumo } from './entities/insumo.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Insumo])],
  exports: [TypeOrmModule],
  controllers: [InsumoController],
  providers: [InsumoService],
})
export class InsumoModule {}
