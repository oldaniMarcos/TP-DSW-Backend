import { Module } from '@nestjs/common';
import { PrecioAtencionService } from './precio-atencion.service';
import { PrecioAtencionController } from './precio-atencion.controller';

@Module({
  controllers: [PrecioAtencionController],
  providers: [PrecioAtencionService],
})
export class PrecioAtencionModule {}
