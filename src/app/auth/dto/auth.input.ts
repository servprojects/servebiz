import { InputType, PickType } from '@nestjs/graphql';

import { AuthType } from '../entities/auth.entity';

@InputType()
export class AuthInput extends PickType(AuthType, [
  'username',
  'password',
]) {
  permission: 'client';
}
