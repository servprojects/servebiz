import { Request } from 'express';

import { User } from '@/app/masterdata/user/entities/user.entity';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { AuthInput } from './dto/auth.input';
import { AuthResponse } from './entities/auth.entity';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthResponse)
  async signin(
    @Args('inputs') authInput: AuthInput,
    @Context('req') req: Request,
  ) {
    const serviceResponse = await this.authService.signin(authInput);
    const { user, token } = serviceResponse;
    req.res?.cookie('jwt', token, { httpOnly: true });

    return serviceResponse;
  }

  @Mutation(() => User)
  signOut(@Context('req') req: Request, @Context('user') user: User): User {
    req.res?.clearCookie('jwt', { httpOnly: true });
    return user;
  }

  @Query(() => User)
  me(@Context('user') user: User): User {
    return user;
  }
}
