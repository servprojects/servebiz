import { Field, InputType, Int, PickType } from '@nestjs/graphql';

import { User } from '../entities/user.entity';

@InputType()
export class UserInput extends PickType(User, [
  'username',
  'password',
  'permissionIds',
  '_id',
]) {
  permission: 'client';
}
