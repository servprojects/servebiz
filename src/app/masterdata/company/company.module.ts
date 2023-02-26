import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Company, CompanySchema } from './entities/company.entity';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';
import {
  ContactDetails,
  ContactDetailsSchema,
} from '@/app/embeded/contactDetails.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: ContactDetails.name, schema: ContactDetailsSchema },
    ]),
  ],
  providers: [CompanyResolver, CompanyService],
})
export class CompanyModule {}
