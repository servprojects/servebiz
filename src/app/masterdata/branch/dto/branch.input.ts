import { Field, InputType, Int, PickType } from '@nestjs/graphql';

import { Branch } from '../entities/branch.entity';

@InputType()
export class BranchInput extends PickType(Branch, [
  'code',
  'name',
  'companyId',
  '_id',
]) {
  permission: 'client';
}
