import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PermissionService } from '../permission/permission.service';
import { Permission, PermissionSchema } from '../permission/entities/permission.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [UserResolver, UserService, PermissionService],
})
export class UserModule {}
