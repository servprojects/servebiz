import * as bcrypt from 'bcrypt';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CompanyInput } from './dto/company.input';
import { Company, CompanyDocument } from './entities/company.entity';
import { GeneralArgs } from '@/app/general/dto/general.args';
import { companyObjectFilters } from './utils/companyObjectFilter';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>,
  ) {}

  async create(inputData: CompanyInput) {
    const createdCompany = new this.companyModel({
      name: inputData.name,
      code: inputData.code,
      contactDetails: inputData.contactDetails,
    });

    return createdCompany.save();
  }

  findAll(args: GeneralArgs) {
    let objectFilter = companyObjectFilters(args);

    return this.companyModel.find(objectFilter ? objectFilter : {}).exec();
  }

  findOne(id: MongooseSchema.Types.ObjectId) {
    let company = this.companyModel.findById(id).exec();

    return company;
  }

  update(inputData: CompanyInput) {
    return this.companyModel
      .findByIdAndUpdate(inputData._id, inputData, { new: true })
      .exec();
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return this.companyModel.findByIdAndDelete(id).exec();
  }
}
