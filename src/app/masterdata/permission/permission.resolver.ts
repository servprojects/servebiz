import { Schema as MongooseSchema } from 'mongoose';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PermissionInput } from './dto/permission.input';
import { Permission } from './entities/permission.entity';
import { PermissionService } from './permission.service';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Mutation(() => Permission)
  upsertPermission(@Args('inputs') inputData: PermissionInput) {
    if (inputData._id) {
      return this.permissionService.update(inputData);
    } else {
      return this.permissionService.create(inputData);
    }
  }

  @Query(() => [Permission], { name: 'permissions' })
  findAll() {
    return this.permissionService.findAll({});
  }

  @Query(() => Permission, { name: 'permission' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.permissionService.findOne(id);
  }

  @Mutation(() => Permission)
  removePermission(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.permissionService.remove(id);
  }
}
