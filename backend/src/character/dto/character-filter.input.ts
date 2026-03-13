import { InputType, Field } from '@nestjs/graphql';
import { Status } from '../enums/status.enum';
import { Gender } from '../enums/gender.enum';

@InputType()
export class CharacterFilterInput {
  @Field(() => Status, { nullable: true })
  status?: Status;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  search?: string;
}
