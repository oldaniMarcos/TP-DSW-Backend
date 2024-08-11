import { Module } from '@nestjs/common';
import { VeterinarioService } from './veterinario.service';
import { VeterinarioController } from './veterinario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veterinario } from './entities/veterinario.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Veterinario])],
  exports: [TypeOrmModule],
  controllers: [VeterinarioController],
  providers: [VeterinarioService],
})
export class VeterinarioModule {}
