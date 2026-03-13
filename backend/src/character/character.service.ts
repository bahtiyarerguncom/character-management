import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CharacterFilterInput } from './dto/character-filter.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}

  /**
   * Filtre parametreleri opsiyonel — hiçbiri verilmezse tüm karakterler döner.
   * Search hem name hem description üzerinde OR ile çalışır, böylece
   * kullanıcı tek inputla her iki alanı da arayabiliyor.
   */
  async findAll(filter?: CharacterFilterInput) {
    const where: Prisma.CharacterWhereInput = {};

    if (filter?.status) {
      where.status = filter.status;
    }

    if (filter?.gender) {
      where.gender = filter.gender;
    }

    // search hem isimde hem açıklamada arar — SQLite case-sensitive
    // olduğu için şimdilik büyük/küçük harf duyarlı çalışıyor
    if (filter?.search) {
      where.OR = [
        { name: { contains: filter.search } },
        { description: { contains: filter.search } },
      ];
    }

    return this.prisma.character.findMany({
      where,
      orderBy: { name: 'asc' },
    });
  }
}
