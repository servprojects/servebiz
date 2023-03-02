import * as bcrypt from 'bcrypt';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserInput } from './dto/user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(inputData: UserInput) {
    const password = await bcrypt.hash(inputData.password, 10);
    const createdUser = new this.userModel({
      username: inputData.username,
      password: password,
      contactDetails: inputData.contactDetails,
      personalDetails: inputData.personalDetails,
      permissions: inputData.permissionIds,
      branches: inputData.branchIds,
      branchOnDuty: inputData.branchOnDutyId,
      departments: inputData.departmentIds,
      departmentOnDuty: inputData.departmentOnDutyId,
    });

    return createdUser.save();
  }

  findAll() {
    return this.userModel
      .find({})
      .populate('permissions')
      .populate('branches')
      .populate('branchOnDuty')
      .populate('departments')
      .populate('departmentOnDuty')
      .exec();
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
