import { Module } from '@nestjs/common';
import { RazaService } from './raza.service';
import { RazaController } from './raza.controller';
import { Raza } from './entities/raza.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Raza])],
  exports: [TypeOrmModule],
  controllers: [RazaController],
  providers: [RazaService],
})
export class RazaModule {}
