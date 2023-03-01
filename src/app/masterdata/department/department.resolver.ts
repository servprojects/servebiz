import { Schema as MongooseSchema } from 'mongoose';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { DepartmentInput } from './dto/department.input';
import { Department } from './entities/department.entity';
import { DepartmentService } from './department.service';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => Department)
  upsertDepartment(@Args('inputs') inputData: DepartmentInput) {
    if (inputData._id) {
      return this.departmentService.update(inputData);
    } else {
      return this.departmentService.create(inputData);
    }
  }

  @Query(() => [Department], { name: 'departmentes' })
  findAll() {
    return this.departmentService.findAll({});
  }

  @Query(() => Department, { name: 'department' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.departmentService.findOne(id);
  }

  @Mutation(() => Department)
  removeDepartment(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.departmentService.remove(id);
  }
}
