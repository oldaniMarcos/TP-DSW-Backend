import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { RazaModule } from './raza/raza.module';
import { InsumoModule } from './insumo/insumo.module';
import { EspecieModule } from './especie/especie.module';
import { VeterinarioModule } from './veterinario/veterinario.module';
import { AnimalModule } from './animal/animal.module';
import { AtencionModule } from './atencion/atencion.module';
import { PrecioAtencionModule } from './precio-atencion/precio-atencion.module';
import { TipoInsumoModule } from './tipo-insumo/tipo-insumo.module';
import { PrecioInsumoModule } from './precio-insumo/precio-insumo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './animal/entities/animal.entity';
import { Atencion } from './atencion/entities/atencion.entity';
import { Cliente } from './cliente/entities/cliente.entity';
import { Especie } from './especie/entities/especie.entity';
import { Insumo } from './insumo/entities/insumo.entity';
import { PrecioAtencion } from './precio-atencion/entities/precio-atencion.entity';
import { PrecioInsumo } from './precio-insumo/entities/precio-insumo.entity';
import { Raza } from './raza/entities/raza.entity';
import { TipoInsumo } from './tipo-insumo/entities/tipo-insumo.entity';
import { Veterinario } from './veterinario/entities/veterinario.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'veterinaria_dsw',
     //  type: 'mysql',
      // host: process.env.DB_HOST,
     //  port: +process.env.DB_PORT,
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
      entities: [Animal, Atencion, Cliente, Especie, Insumo, 
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
