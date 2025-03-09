import { Module } from '@nestjs/common';
import { EspecieService } from './especie.service';
import { EspecieController } from './especie.controller';
import { Especie } from './entities/especie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Especie])],
  exports: [TypeOrmModule],
  controllers: [EspecieController],
  providers: [EspecieService],
})
export class EspecieModule { }
