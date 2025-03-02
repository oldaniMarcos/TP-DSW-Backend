import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() input: {usuario: string; password: string}) {
        return this.authService.authenticate(input)
    }

    @UseGuards(AuthGuard)
    @Get('me')
    getUsuario(@Request() request) {
        return request.usuario
    }
}
