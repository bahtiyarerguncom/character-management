import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [
    // schema-first yerine code-first yaklaşım — model dekoratörleri doğrudan
    // schema.gql'e yansıyor, ekstra SDL yazmaya gerek yok
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    PrismaModule,
    CharacterModule,
  ],
})
export class AppModule {}
