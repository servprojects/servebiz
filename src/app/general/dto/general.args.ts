import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ID, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  first?: number = 15;
  @Field(() => Int)
  page?: number = 1;
  @Field(() => Int)
  skip?: number = 0;
  @Field(() => Int)
  perPage?: number = 10;
}

@ArgsType()
export class GeneralArgs {
  @Field((type) => ID, { nullable: true })
  id?: MongooseSchema.Types.ObjectId;
  @Field(() => [ID], { nullable: true })
  ids?: MongooseSchema.Types.ObjectId[];
  @Field(() => String, { nullable: true })
  searchArg?: string;
  @Field(() => String, { nullable: true })
  type?: string;
  @Field(() => String, { nullable: true })
  user?: string;
}
