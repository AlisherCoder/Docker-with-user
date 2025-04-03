import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      let data = await this.prisma.user.create({ data: createUserDto });
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let data = await this.prisma.user.findMany();

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.prisma.user.findUnique({ where: { id } });
      if (!data) {
        return new NotFoundException('Not found data');
      }
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let data = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      if (!data) {
        return new NotFoundException('Not found data');
      }
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let data = await this.prisma.user.delete({ where: { id } });
      if (!data) {
        return new NotFoundException('Not found data');
      }
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
