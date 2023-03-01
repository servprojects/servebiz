import * as bcrypt from 'bcrypt';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { GeneralArgs } from '@/app/general/dto/general.args';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CompanyService } from '../company/company.service';
import { DepartmentInput } from './dto/department.input';
import { Department, DepartmentDocument } from './entities/department.entity';
import { departmentObjectFilters } from './utils/departmentObjectFilter';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
    private readonly companyService: CompanyService,
  ) {}

  async create(inputData: DepartmentInput) {
    let company = null;

    let payload = {
      name: inputData.name,
      code: inputData.code,
    };

    const createdDepartment = new this.departmentModel(payload);

    return createdDepartment.save();
  }

  findAll(args: GeneralArgs) {
    let objectFilter = departmentObjectFilters(args);

    return this.departmentModel
      .find(objectFilter ? objectFilter : {})
      .exec();
  }

  findOne(id: MongooseSchema.Types.ObjectId) {
    return this.departmentModel.findById(id).exec();
  }

  update(inputData: DepartmentInput) {
    return this.departmentModel
      .findByIdAndUpdate(inputData._id, inputData, { new: true })
      .exec();
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return this.departmentModel.findByIdAndDelete(id).exec();
  }
}
