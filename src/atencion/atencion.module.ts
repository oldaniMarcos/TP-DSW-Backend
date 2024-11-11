import { Module } from '@nestjs/common';
import { AtencionService } from './atencion.service';
import { AtencionController } from './atencion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atencion } from './entities/atencion.entity';
import { PrecioAtencion } from 'src/precio-atencion/entities/precio-atencion.entity';
import { Animal } from 'src/animal/entities/animal.entity';
import { Veterinario } from 'src/veterinario/entities/veterinario.entity';
import { Insumo } from 'src/insumo/entities/insumo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Atencion, Animal, PrecioAtencion, Veterinario, Insumo])],
  exports: [TypeOrmModule],
  controllers: [AtencionController],
  providers: [AtencionService],
})
export class AtencionModule { }
