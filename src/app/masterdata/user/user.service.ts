import * as bcrypt from 'bcrypt';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserInput } from './dto/user.input';
import { User, UserDocument } from './entities/user.entity';
import { PermissionService } from '../permission/permission.service';
import { BranchService } from '../branch/branch.service';
import { DepartmentService } from '../department/department.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly permissionService: PermissionService,
    private readonly branchService: BranchService,
    private readonly departmentService: DepartmentService,
  ) {}

  async create(inputData: UserInput) {
    let permissions = [];
    let branches = [];
    let departments = [];
    let branchOnDuty = null;
    let departmentOnDuty = null;

    if (inputData.permissionIds) {
      permissions = await this.permissionService.findAll({
        ids: inputData.permissionIds,
      });
    }

    if (inputData.branchIds) {
      branches = await this.branchService.findAll({
        ids: inputData.branchIds,
      });
    }

    if (inputData.branchOnDutyId) {
      branchOnDuty = await this.branchService.findOne(inputData.branchOnDutyId);
    }

    if (inputData.departmentIds) {
      departments = await this.departmentService.findAll({
        ids: inputData.departmentIds,
      });
    }

    if (inputData.departmentOnDutyId) {
      departmentOnDuty = await this.departmentService.findOne(inputData.departmentOnDutyId);
    }

    const password = await bcrypt.hash(inputData.password, 10);
    const createdUser = new this.userModel({
      username: inputData.username,
      password: password,
      contactDetails: inputData.contactDetails,
      personalDetails: inputData.personalDetails,
      permissions,
      branches,
      branchOnDuty,
      departments,
      departmentOnDuty,
    });

    return createdUser.save();
  }

  findAll() {
    return this.userModel.find({}).populate('permissions').exec();
  }

  findOne(id: MongooseSchema.Types.ObjectId) {
    return this.userModel.findById(id).exec();
  }

  update(updateUserInput: UserInput) {
    return this.userModel
      .findByIdAndUpdate(updateUserInput._id, updateUserInput, { new: true })
      .exec();
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
