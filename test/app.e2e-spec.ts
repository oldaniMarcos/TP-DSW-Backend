import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Cliente } from '../src/cliente/entities/cliente.entity';

const rol: 'cliente' = "cliente";
 
const mockCliente: Cliente = {
  id: 1,
  dni: '12345678',
  nombreYApellido: 'Juan Pérez',
  telefono: '123456789',
  direccion: 'Calle Ficticia 123',
  email: 'juan@example.com',
  rol: rol,
  usuario: 'juanperez',
  password: 'contraseña',
  animales: []
  };

describe('ClienteController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Cliente>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Cliente))
      .useValue({
        save: jest.fn().mockResolvedValue(mockCliente),
        find: jest.fn().mockResolvedValue([mockCliente]),
        findOneBy: jest.fn().mockResolvedValue(mockCliente),
        update: jest.fn().mockResolvedValue({ affected: 1 }),
        delete: jest.fn().mockResolvedValue({ affected: 1 }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    repository = moduleFixture.get<Repository<Cliente>>(getRepositoryToken(Cliente));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /cliente', () => {
    it('should create a new cliente', async () => {
      jest.spyOn(repository, 'save').mockResolvedValue(mockCliente);

      const response = await request(app.getHttpServer())
        .post('/cliente')
        .send({
          dni: '12345678',
          nombreYApellido: 'Test Cliente',
          telefono: '123456789',
          direccion: 'Calle Falsa 123',
          email: 'cliente@test.com',
          rol: 'cliente',
          usuario: 'clienteUser',
          password: 'hashedpassword',
          animales: [],
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCliente);
    });
  });

  describe('GET /cliente', () => {
    it('should find all Cliente', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockCliente]);

      const response = await request(app.getHttpServer()).get('/cliente');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockCliente]);
    });
  });

  describe('GET /cliente/:id', () => {
    it('should find a Cliente by ID', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockCliente);

      const response = await request(app.getHttpServer()).get(`/cliente/${mockCliente.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCliente);
    });

    it('should return 404 if Cliente doesnt exist', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined);

      const response = await request(app.getHttpServer()).get('/cliente/99999');

      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /cliente/:id', () => {
    it('should update a Cliente', async () => {
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(repository, 'findOneBy').mockResolvedValue({ ...mockCliente, telefono: '987654321' });

      const response = await request(app.getHttpServer())
        .patch(`/cliente/${mockCliente.id}`)
        .send({ telefono: '987654321' });

      expect(response.status).toBe(200);
      expect(response.body.telefono).toBe('987654321');
    });
  });

  describe('DELETE /cliente/:id', () => {
    it('should delete a Cliente', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

      const response = await request(app.getHttpServer()).delete(`/cliente/${mockCliente.id}`);

      expect(response.status).toBe(200);
    });
  });
});
