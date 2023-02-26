import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CompanyService } from '../company/company.service';
import { Company, CompanySchema } from '../company/entities/company.entity';
import { BranchResolver } from './branch.resolver';
import { BranchService } from './branch.service';
import { Branch, BranchSchema } from './entities/branch.entity';
import { ContactDetails, ContactDetailsSchema } from '@/app/embeded/contactDetails.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Branch.name, schema: BranchSchema },
      { name: Company.name, schema: CompanySchema },
      { name: ContactDetails.name, schema: ContactDetailsSchema },
    ]),
  ],
  providers: [BranchResolver, BranchService, CompanyService],
})
export class BranchModule {}
