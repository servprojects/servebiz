import * as bcrypt from 'bcrypt';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserInput } from './dto/user.input';
import { User, UserDocument } from './entities/user.entity';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly permissionService: PermissionService,
  ) {}

  async create(inputData: UserInput) {
    let permissions = [];
    if (inputData.permissionIds) {
      permissions = await this.permissionService.findAll({
        ids: inputData.permissionIds,
      });
    }

    const password = await bcrypt.hash(inputData.password, 10);
    const createdUser = new this.userModel({
      username: inputData.username,
      password: password,
      permissions,
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
