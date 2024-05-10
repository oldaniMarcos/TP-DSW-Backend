import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { RazaModule } from './raza/raza.module';

@Module({
  imports: [ClienteModule, RazaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
