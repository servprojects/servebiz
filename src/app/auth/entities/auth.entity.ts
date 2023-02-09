import { User } from '@/app/user/entities/user.entity';
import { ObjectType, InputType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@InputType('AuthType', { isAbstract: true })
@ObjectType()
export class AuthType  {
  @Field((type) => String)
  username: string;

  @Field((type) => String)
  password: string;
}

@ObjectType()
export class AuthResponse  {
  @Field((type) => User)
  user: User;

  @Field((type) => String)
  token: string;
}

