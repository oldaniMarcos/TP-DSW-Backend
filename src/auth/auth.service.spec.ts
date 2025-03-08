import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let clienteService: ClienteService;
  let jwtService: JwtService;

  const mockClienteService = {
    findByUsuario: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: ClienteService, useValue: mockClienteService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    clienteService = module.get<ClienteService>(ClienteService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('authenticate', () => {
    it('should authenticate and return a token', async () => {
      const authInput = { usuario: 'test', password: 'test' };
      const clienteMock = {
        id: 1,
        usuario: 'test',
        password: 'hashedpassword',
        nombreYApellido: 'Test',
        dni: '12345678',
        email: 'test@example.com',
        rol: 'admin',
      };

      mockClienteService.findByUsuario.mockResolvedValue(clienteMock);

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      mockJwtService.signAsync.mockResolvedValue('mockedToken');

      const result = await authService.authenticate(authInput);

      expect(result).toEqual({
        token: 'mockedToken',
        user: {
          id: 1,
          usuario: 'test',
          nombreYApellido: 'Test',
          dni: '12345678',
          email: 'test@example.com',
          rol: 'admin',
        },
      });
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      const authInput = { usuario: 'test', password: 'wrongpassword' };
      const clienteMock = {
        id: 1,
        usuario: 'test',
        password: 'hashedpassword',
        nombreYApellido: 'Test',
        dni: '12345678',
        email: 'test@example.com',
        rol: 'admin',
      };

      mockClienteService.findByUsuario.mockResolvedValue(clienteMock);

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(authService.authenticate(authInput)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('should throw NotFoundException if Cliente is not found', async () => {
      const authInput = { usuario: 'invalidCliente', password: 'test' };

      mockClienteService.findByUsuario.mockResolvedValue(null);

      await expect(authService.authenticate(authInput)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
