import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  exports: [TypeOrmModule],
  controllers: [AnimalController],
  providers: [AnimalService],
})
export class AnimalModule { }
