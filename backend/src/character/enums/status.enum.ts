import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
  UNKNOWN = 'UNKNOWN',
}

registerEnumType(Status, { name: 'Status' });
