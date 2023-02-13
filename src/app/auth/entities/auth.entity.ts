import { User } from '@/app/user/entities/user.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

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

