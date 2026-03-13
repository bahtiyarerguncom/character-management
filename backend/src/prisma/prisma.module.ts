import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// @Global sayesinde her modülde ayrıca import etmeye gerek yok
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
