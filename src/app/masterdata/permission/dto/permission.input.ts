import { Field, InputType, Int, PickType } from '@nestjs/graphql';

import { Permission } from '../entities/permission.entity';

@InputType()
export class PermissionInput extends PickType(Permission, [
  'code',
  'name',
  'weight',
  '_id',
]) {
  permission: 'client';
}
