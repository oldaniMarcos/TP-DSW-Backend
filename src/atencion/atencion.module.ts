import { Module } from '@nestjs/common';
import { AtencionService } from './atencion.service';
import { AtencionController } from './atencion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atencion } from './entities/atencion.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Atencion])],
  exports: [TypeOrmModule],
  controllers: [AtencionController],
  providers: [AtencionService],
})
export class AtencionModule { }
