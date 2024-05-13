import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { RazaModule } from './raza/raza.module';
import { InsumoModule } from './insumo/insumo.module';

@Module({
  imports: [ClienteModule, RazaModule, InsumoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
