import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity.js';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>
  ) { }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {

    const admin = new Admin();
    admin.usuario = createAdminDto.usuario;

    const saltOrRounds = 10
    admin.password = await bcrypt.hash(createAdminDto.password, saltOrRounds);

    return this.adminRepository.save(admin)
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  findOne(id: number): Promise<Admin> {
    return this.adminRepository.findOneBy({ id: id });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {

    if (updateAdminDto.password) {
      const saltOrRounds = 10;
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, saltOrRounds);
    }

    await this.adminRepository.update(id, updateAdminDto);
    return this.adminRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.adminRepository.delete(id)
  }

  async login(usuario: string, password: string): Promise<Admin> {
    const admin = await this.adminRepository.findOneBy({ usuario });
    if (!admin) {
      throw new NotFoundException('Admin no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Datos de login invalidos');
    }

    return admin;
  }
}
