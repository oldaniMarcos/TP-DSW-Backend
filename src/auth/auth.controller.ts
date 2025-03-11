import { Body, Controller, Get, Post, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../public/public.decorator';
import { ClienteService } from '../cliente/cliente.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private clienteService: ClienteService) {}

    @Public()
    @Post('login')
    login(@Body() input: {usuario: string; password: string}) {
        return this.authService.authenticate(input)
    }

    @Get('me')
    async getUser(@Request() request) {        

        if(!request.usuario) throw new UnauthorizedException('Usuario no encontrado')
        
        const userId = request.usuario.id
        return this.clienteService.findOne(userId)
    }
}
