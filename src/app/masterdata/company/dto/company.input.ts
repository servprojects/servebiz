import { Field, InputType, Int, PickType } from '@nestjs/graphql';

import { Company } from '../entities/company.entity';

@InputType()
export class CompanyInput extends PickType(Company, [
  'code',
  'name',
  'contactDetails',
  '_id',
]) {
  permission: 'client';
}
