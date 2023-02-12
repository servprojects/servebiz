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
    const { user, token } = serviceResponse
    req.res?.cookie('jwt', token, { httpOnly: true });
    
    return serviceResponse;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  signOut(@Context('req') req: Request, @Context('user') user: User): User {
    req.res?.clearCookie('jwt', { httpOnly: true });
    return user;
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  me(@Context('user') user: User): User {
  // me(@Context('user') user: User, @Context() sample : any): User {
  
    return user;
  }
}
