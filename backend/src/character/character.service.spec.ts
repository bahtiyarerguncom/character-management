import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { PrismaService } from '../prisma/prisma.service';

// PrismaService'i mockla — unit testte gerçek DB'ye bağlanmaya gerek yok
const mockPrisma = {
  character: {
    findMany: jest.fn(),
  },
};

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all characters when no filter is given', async () => {
    mockPrisma.character.findMany.mockResolvedValue([{ name: 'Test' }]);

    await service.findAll();

    expect(mockPrisma.character.findMany).toHaveBeenCalledWith({
      where: {},
      orderBy: { name: 'asc' },
    });
  });

  it('should filter by status', async () => {
    mockPrisma.character.findMany.mockResolvedValue([]);

    await service.findAll({ status: 'ALIVE' } as any);

    expect(mockPrisma.character.findMany).toHaveBeenCalledWith({
      where: { status: 'ALIVE' },
      orderBy: { name: 'asc' },
    });
  });

  it('should filter by gender', async () => {
    mockPrisma.character.findMany.mockResolvedValue([]);

    await service.findAll({ gender: 'FEMALE' } as any);

    expect(mockPrisma.character.findMany).toHaveBeenCalledWith({
      where: { gender: 'FEMALE' },
      orderBy: { name: 'asc' },
    });
  });

  it('should search by name and description with OR', async () => {
    mockPrisma.character.findMany.mockResolvedValue([]);

    await service.findAll({ search: 'dragon' } as any);

    expect(mockPrisma.character.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          { name: { contains: 'dragon' } },
          { description: { contains: 'dragon' } },
        ],
      },
      orderBy: { name: 'asc' },
    });
  });

  it('should combine multiple filters', async () => {
    mockPrisma.character.findMany.mockResolvedValue([]);

    await service.findAll({ status: 'DEAD', gender: 'MALE', search: 'knight' } as any);

    expect(mockPrisma.character.findMany).toHaveBeenCalledWith({
      where: {
        status: 'DEAD',
        gender: 'MALE',
        OR: [
          { name: { contains: 'knight' } },
          { description: { contains: 'knight' } },
        ],
      },
      orderBy: { name: 'asc' },
    });
  });
});
