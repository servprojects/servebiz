import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './entities/auth.entity';
import { AuthInput } from './dto/auth.input';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from '@/app/user/entities/user.entity';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/app/guard/auth.guard';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

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
  async signinLocal(
    @Args('data') data: AuthInput,
    @Context('req') req: Request,
  ): Promise<User> {
    const { user, token } = await this.authService.signin(data);
    req.res?.cookie('jwt', token, { httpOnly: true });
    return user;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  signOut(@Context('req') req: Request, @Context('user') user: User): User {
    req.res?.clearCookie('jwt', { httpOnly: true });
    return user;
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  async me(@Context('user') user: User): Promise<User> {
    console.log(user);
    return user;
  }
}
