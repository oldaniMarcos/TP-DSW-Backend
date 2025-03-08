import { Test, TestingModule } from '@nestjs/testing';
import { PrecioAtencionService } from './precio-atencion.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PrecioAtencion } from './entities/precio-atencion.entity';
import { NotFoundException } from '@nestjs/common';

const mockPrecioAtencion = {
  idPrecioAtencion: 1,
  fechaDesde: '2025-01-01',
  valor: 1000,
  atenciones: [],
};

describe('PrecioAtencionService', () => {
  let service: PrecioAtencionService;
  let repository: Repository<PrecioAtencion>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrecioAtencionService,
        {
          provide: getRepositoryToken(PrecioAtencion),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PrecioAtencionService>(PrecioAtencionService);
    repository = module.get<Repository<PrecioAtencion>>(getRepositoryToken(PrecioAtencion));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new PrecioAtencion', async () => {
      jest.spyOn(repository, 'save').mockResolvedValue(mockPrecioAtencion);

      const result = await service.create({
        fechaDesde: '2025-01-01',
        valor: 1000,
      });

      expect(result).toEqual(mockPrecioAtencion);
      expect(repository.save).toHaveBeenCalledWith({
        fechaDesde: '2025-01-01',
        valor: 1000,
      });
    });
  });

  describe('findAll', () => {
    it('should return all PrecioAtencion', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockPrecioAtencion]);

      const result = await service.findAll();
      expect(result).toEqual([mockPrecioAtencion]);
    });
  });

  describe('findOne', () => {
    it('should return a PrecioAtencion by ID', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockPrecioAtencion);

      const result = await service.findOne(1);
      expect(result).toEqual(mockPrecioAtencion);
    });

    it('should return undefined if PrecioAtencion is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined);

      const result = await service.findOne(999);
      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a PrecioAtencion', async () => {
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(repository, 'findOneBy').mockResolvedValue({
        ...mockPrecioAtencion,
        valor: 2000,
      });

      const result = await service.update(1, { valor: 2000 });
      expect(result.valor).toBe(2000);
    });
  });

  describe('remove', () => {
    it('should remove a PrecioAtencion', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);
      await expect(service.remove(1)).resolves.toBeUndefined();
    });
  });

  describe('findMostRecent', () => {
    it('should return the most recent PrecioAtencion', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockPrecioAtencion]);

      const result = await service.findMostRecent();
      expect(result).toEqual(mockPrecioAtencion);
    });

    it('should throw NotFoundException if no records exist', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(service.findMostRecent()).rejects.toThrow(NotFoundException);
    });
  });
});
