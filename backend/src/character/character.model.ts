import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Status } from './enums/status.enum';
import { Gender } from './enums/gender.enum';

@ObjectType()
export class Character {
  @Field(() => Int)
  id: number;

  @Field()
  image: string;

  @Field()
  name: string;

  @Field(() => Status)
  status: Status;

  @Field(() => Gender)
  gender: Gender;

  @Field()
  description: string;
}
