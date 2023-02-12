import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserInput } from './dto/user.input';
import { Schema as MongooseSchema } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/app/guard/auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('inputs') createUserInput: UserInput) {
    return this.userService.create(createUserInput);
  }

  // @UseGuards(AuthGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UserInput) {
    return this.userService.update(updateUserInput);
  }

  // @UseGuards(AuthGuard)
  @Mutation(() => User)
  removeUser(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.userService.remove(id);
  }
}
