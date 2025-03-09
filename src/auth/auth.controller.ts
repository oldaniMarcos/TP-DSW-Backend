import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../public/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    login(@Body() input: {usuario: string; password: string}) {
        return this.authService.authenticate(input)
    }

    @Get('me')
    getUsuario(@Request() request) {
        return request.usuario
    }
}
