import * as bcrypt from 'bcrypt';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { GeneralArgs } from '@/app/general/dto/general.args';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CompanyService } from '../company/company.service';
import { BranchInput } from './dto/branch.input';
import { Branch, BranchDocument } from './entities/branch.entity';
import { branchObjectFilters } from './utils/branchObjectFilter';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch.name)
    private branchModel: Model<BranchDocument>,
    private readonly companyService: CompanyService,
  ) {}

  async create(inputData: BranchInput) {
    let company = null;
    if (inputData.companyId) {
      company = await this.companyService.findOne(inputData.companyId);
    }

    let payload = {
      name: inputData.name,
      code: inputData.code,
      company,
    };

    const createdBranch = new this.branchModel(payload);

    return createdBranch.save();
  }

  findAll(args: GeneralArgs) {
    let objectFilter = branchObjectFilters(args);

    return this.branchModel
      .find(objectFilter ? objectFilter : {})
      .populate('company')
      .exec();
  }

  findOne(id: MongooseSchema.Types.ObjectId) {
    return this.branchModel.findById(id).exec();
  }

  update(inputData: BranchInput) {
    return this.branchModel
      .findByIdAndUpdate(inputData._id, inputData, { new: true })
      .exec();
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return this.branchModel.findByIdAndDelete(id).exec();
  }
}
