import { Module } from '@nestjs/common';
import { AtencionService } from './atencion.service';
import { AtencionController } from './atencion.controller';

@Module({
  controllers: [AtencionController],
  providers: [AtencionService],
})
export class AtencionModule {}
