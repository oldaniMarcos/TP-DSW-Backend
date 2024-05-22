import { Module } from '@nestjs/common';
import { TipoInsumoService } from './tipo-insumo.service';
import { TipoInsumoController } from './tipo-insumo.controller';

@Module({
  controllers: [TipoInsumoController],
  providers: [TipoInsumoService],
})
export class TipoInsumoModule {}
