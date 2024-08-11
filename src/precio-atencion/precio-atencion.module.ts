import { Module } from '@nestjs/common';
import { PrecioAtencionService } from './precio-atencion.service';
import { PrecioAtencionController } from './precio-atencion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrecioAtencion } from './entities/precio-atencion.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([PrecioAtencion])],
  exports: [TypeOrmModule],
  controllers: [PrecioAtencionController],
  providers: [PrecioAtencionService],
})
export class PrecioAtencionModule {}
