import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// NestJS lifecycle hook'larına bağlayarak Prisma bağlantısını yönetiyoruz,
// hot-reload sırasında bağlantı sızıntısını önlemek için önemli
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
