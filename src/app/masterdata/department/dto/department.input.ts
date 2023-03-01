import { Field, InputType, Int, PickType } from '@nestjs/graphql';

import { Department } from '../entities/department.entity';

@InputType()
export class DepartmentInput extends PickType(Department, [
  'code',
  'name',
  '_id',
]) {
  permission: 'client';
}
