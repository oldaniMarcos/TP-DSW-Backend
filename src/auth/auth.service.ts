import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type AuthInput = { usuario: string; password: string}
type SignInData = { idCliente: number; usuario: string}
type AuthResult = { token: string; idCliente: number; usuario: string}


@Injectable()
export class AuthService {

    constructor(private clienteService: ClienteService,
        private jwtService: JwtService
    ) {}

    async authenticate(input: AuthInput): Promise<AuthResult> {
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
        throw new UnauthorizedException('Datos de login invalidos');
        }

        return {
            idCliente: usuario.id,
            usuario: usuario.usuario
        }
    }

    async signIn(usuario: SignInData): Promise<AuthResult> {
        const payload = {
            sub: usuario.idCliente,
            usuario: usuario.usuario,
        }

        const token = await this.jwtService.signAsync(payload)

        return {
            token,
            usuario: usuario.usuario,
            idCliente: usuario.idCliente,
        }
    }
}
