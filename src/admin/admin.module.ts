import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity.js';


@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  exports: [TypeOrmModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
