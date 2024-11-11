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
import { Atencion } from './atencion/entities/atencion.entity.js';
import { Cliente } from './cliente/entities/cliente.entity.js';
import { Especie } from './especie/entities/especie.entity.js';
import { Insumo } from './insumo/entities/insumo.entity.js';
import { PrecioAtencion } from './precio-atencion/entities/precio-atencion.entity.js';
import { PrecioInsumo } from './precio-insumo/entities/precio-insumo.entity.js';
import { Raza } from './raza/entities/raza.entity.js';
import { TipoInsumo } from './tipo-insumo/entities/tipo-insumo.entity.js';
import { Veterinario } from './veterinario/entities/veterinario.entity.js';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'veterinaria_dsw',
      entities: [Admin ,Animal, Atencion, Cliente, Especie, Insumo, 
        PrecioAtencion, PrecioInsumo, Raza, TipoInsumo, Veterinario],
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
    PrecioInsumoModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
