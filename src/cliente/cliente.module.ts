import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  exports: [TypeOrmModule],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule { }
