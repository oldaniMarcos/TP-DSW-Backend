import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { RazaModule } from './raza/raza.module';
import { InsumoModule } from './insumo/insumo.module';
import { EspecieModule } from './especie/especie.module';
import { VeterinarioModule } from './veterinario/veterinario.module';
import { AnimalModule } from './animal/animal.module.js';
import { AtencionModule } from './atencion/atencion.module';
import { PrecioAtencionModule } from './precio-atencion/precio-atencion.module';
import { TipoInsumoModule } from './tipo-insumo/tipo-insumo.module';
import { PrecioInsumoModule } from './precio-insumo/precio-insumo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './animal/entities/animal.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'veterinaria_dsw',
      entities: [Animal],
      synchronize: true,
    }),
    ClienteModule,
    RazaModule,
    InsumoModule,
    EspecieModule,
    VeterinarioModule, AnimalModule,
    AtencionModule,
    PrecioAtencionModule,
    TipoInsumoModule,
    PrecioInsumoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
