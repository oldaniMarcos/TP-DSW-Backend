import { Test, TestingModule } from '@nestjs/testing';
import { VeterinarioService } from './veterinario.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Veterinario } from '../veterinario/entities/veterinario.entity';

const mockVeterinario = {
  idVeterinario: 1,
  dni: '12345678',
  nroMatricula: '12345',
  nombreYApellido: 'Test',
  telefono: '123456789',
  direccion: 'Test 123',
  email: 'test@test.com',
  atenciones: [],
};

describe('VeterinarioService', () => {
  let service: VeterinarioService;
  let repository: Repository<Veterinario>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VeterinarioService,
        {
          provide: getRepositoryToken(Veterinario),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VeterinarioService>(VeterinarioService);
    repository = module.get<Repository<Veterinario>>(getRepositoryToken(Veterinario));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new Veterinario', async () => {
      jest.spyOn(repository, 'save').mockResolvedValue(mockVeterinario);
      const result = await service.create(mockVeterinario);
      expect(result).toEqual(mockVeterinario);
    });
  });

  describe('findAll', () => {
    it('should return all Veterinario', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockVeterinario]);
      const result = await service.findAll();
      expect(result).toEqual([mockVeterinario]);
    });
  });

  describe('findOne', () => {
    it('should return a Veterinario by ID', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockVeterinario);
      const result = await service.findOne(1);
      expect(result).toEqual(mockVeterinario);
    });

    it('should return undefined if no Veterinario is found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined);
      const result = await service.findOne(999);
      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a Veterinario', async () => {
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(repository, 'findOneBy').mockResolvedValue({ ...mockVeterinario, telefono: '987654321' });

      const result = await service.update(1, { telefono: '987654321', nroMatricula: '12345', dni: '12345678' });
      expect(result.telefono).toBe('987654321');
    });
  });

  describe('remove', () => {
    it('should remove a Veterinario', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);
      await expect(service.remove(1)).resolves.toBeUndefined();
    });
  });

  describe('checkExistingFields', () => {
    it('should check for existing DNI, email, and nroMatricula', async () => {
      jest.spyOn(repository, 'query').mockImplementation(async (query: string, params: string[]) => {
        if (query.includes('dni') && params[0] === '12345678') return Promise.resolve([{ idVeterinario: 1 }]);
        if (query.includes('email') && params[0] === 'test@test.com') return Promise.resolve([]);
        if (query.includes('nroMatricula') && params[0] === '12345') return Promise.resolve([{ idVeterinario: 1 }]);
        return Promise.resolve([]);
      });

      const result = await service.checkExistingFields('12345678', 'test@test.com', '12345');
      expect(result).toEqual({ dni: true, email: false, nroMatricula: true });
    });
  });
});
