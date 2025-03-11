import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ClienteService } from '../cliente/cliente.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type AuthInput = { usuario: string; password: string}
type SignInData = { 
    id: number;
    usuario: string;
    nombreYApellido: string;
    dni: string;
    email: string;
    rol: string;
}

@Injectable()
export class AuthService {

    constructor(private clienteService: ClienteService,
        private jwtService: JwtService
    ) {}

    async authenticate(input: AuthInput): Promise<{token: string}> {
        const usuario = await this.validateUsuario(input)

        return this.signIn(usuario)
    }

    async validateUsuario(input: AuthInput): Promise<SignInData> {
        const usuario = await this.clienteService.findByUsuario(input.usuario)

        if (!usuario) {
            throw new NotFoundException('Cliente no encontrado');
        }
      
        const isPasswordValid = await bcrypt.compare(input.password, usuario.password);
        if (!isPasswordValid) {
        throw new UnauthorizedException('Contraseña incorrecta');
        }

        return {
            id: usuario.id,
            usuario: usuario.usuario,
            nombreYApellido: usuario.nombreYApellido,
            dni: usuario.dni,
            email: usuario.email,
            rol: usuario.rol,
        }
    }

    async signIn(usuario: SignInData): Promise<{token: string}> {
        const payload = {
            sub: usuario.id,
            usuario: usuario.usuario,
            rol: usuario.rol
        }

        const token = await this.jwtService.signAsync(payload)

        return { token }
    }
}
