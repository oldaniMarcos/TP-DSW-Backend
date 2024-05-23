import { Module } from '@nestjs/common';
import { PrecioInsumoService } from './precio-insumo.service';
import { PrecioInsumoController } from './precio-insumo.controller';

@Module({
  controllers: [PrecioInsumoController],
  providers: [PrecioInsumoService],
})
export class PrecioInsumoModule {}
