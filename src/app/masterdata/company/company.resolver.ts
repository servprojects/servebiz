import { Schema as MongooseSchema } from 'mongoose';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CompanyInput } from './dto/company.input';
import { Company } from './entities/company.entity';
import { CompanyService } from './company.service';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => Company)
  upsertCompany(@Args('inputs') inputData: CompanyInput) {
    if (inputData._id) {
      return this.companyService.update(inputData);
    } else {
      return this.companyService.create(inputData);
    }
  }

  @Query(() => [Company], { name: 'companys' })
  findAll() {
    return this.companyService.findAll({});
  }

  @Query(() => Company, { name: 'company' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.companyService.findOne(id);
  }

  @Mutation(() => Company)
  removeCompany(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.companyService.remove(id);
  }
}
