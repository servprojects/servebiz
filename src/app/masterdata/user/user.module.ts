import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PermissionService } from '../permission/permission.service';
import {
  Permission,
  PermissionSchema,
} from '../permission/entities/permission.entity';
import { BranchService } from '../branch/branch.service';
import { Branch, BranchSchema } from '../branch/entities/branch.entity';
import { Company, CompanySchema } from '../company/entities/company.entity';
import { CompanyService } from '../company/company.service';
import { Department, DepartmentSchema } from '../department/entities/department.entity';
import { DepartmentService } from '../department/department.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: Company.name, schema: CompanySchema },
      { name: Department.name, schema: DepartmentSchema },
    ]),
  ],
  providers: [
    UserResolver,
    UserService,
    PermissionService,
    BranchService,
    CompanyService,
    DepartmentService
  ],
})
export class UserModule {}
