import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from './../prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;
  let prisma;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create user', async () => {
      const dto = { name: 'Bill', age: 23 };
      prisma.user.create.mockResolvedValue(dto);
      await expect(service.create(dto)).resolves.toEqual({ data: dto });
    });
  });

  describe('findall', () => {
    it('find all users', async () => {
      const users = [{ name: 'Bill', age: 23 }];
      prisma.user.findMany.mockResolvedValue(users);
      await expect(service.findAll()).resolves.toEqual({ data: users });
    });
  });

  describe('findone', () => {
    it('find one user', async () => {
      const user = { name: 'Bill', age: 23 };
      prisma.user.findUnique.mockResolvedValue(user);
      await expect(service.findOne('1')).resolves.toEqual({
        data: user,
      });
    });
  });

  describe('delete', () => {
    it('delete one user', async () => {
      const user = { name: 'Bill', age: 23 };
      prisma.user.delete.mockResolvedValue(user);
      await expect(service.remove('1')).resolves.toEqual({
        data: user,
      });
    });
  });

  describe('update', () => {
    it('update one user', async () => {
      const user = { name: 'Bill', age: 23 };
      prisma.user.update.mockResolvedValue(user, {});
      await expect(service.update('1', user)).resolves.toEqual({
        data: user,
      });
    });
  });
});
