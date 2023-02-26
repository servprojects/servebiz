import { Schema as MongooseSchema } from 'mongoose';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { BranchInput } from './dto/branch.input';
import { Branch } from './entities/branch.entity';
import { BranchService } from './branch.service';

@Resolver(() => Branch)
export class BranchResolver {
  constructor(private readonly branchService: BranchService) {}

  @Mutation(() => Branch)
  upsertBranch(@Args('inputs') inputData: BranchInput) {
    if (inputData._id) {
      return this.branchService.update(inputData);
    } else {
      return this.branchService.create(inputData);
    }
  }

  @Query(() => [Branch], { name: 'branches' })
  findAll() {
    return this.branchService.findAll({});
  }

  @Query(() => Branch, { name: 'branch' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.branchService.findOne(id);
  }

  @Mutation(() => Branch)
  removeBranch(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.branchService.remove(id);
  }
}
