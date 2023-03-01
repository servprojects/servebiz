import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CompanyService } from '../company/company.service';
import { Company, CompanySchema } from '../company/entities/company.entity';
import { DepartmentResolver } from './department.resolver';
import { DepartmentService } from './department.service';
import { Department, DepartmentSchema } from './entities/department.entity';
import { ContactDetails, ContactDetailsSchema } from '@/app/embeded/contactDetails.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
      { name: Company.name, schema: CompanySchema },
      { name: ContactDetails.name, schema: ContactDetailsSchema },
    ]),
  ],
  providers: [DepartmentResolver, DepartmentService, CompanyService],
})
export class DepartmentModule {}
