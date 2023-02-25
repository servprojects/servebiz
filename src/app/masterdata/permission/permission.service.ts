import * as bcrypt from 'bcrypt';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { PermissionInput } from './dto/permission.input';
import { Permission, PermissionDocument } from './entities/permission.entity';
import { GeneralArgs } from '@/app/general/dto/general.args';
import { permissionObjectFilters } from './utils/permissionObjectFilter';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async create(inputData: PermissionInput) {
    const createdPermission = new this.permissionModel({
      name: inputData.name,
      code: inputData.code,
      weight: inputData.weight,
    });

    return createdPermission.save();
  }

  findAll(args: GeneralArgs) {
    let objectFilter = permissionObjectFilters(args);
  
    return this.permissionModel.find(objectFilter ? objectFilter : {}).exec();
  }

  findOne(id: MongooseSchema.Types.ObjectId) {
    return this.permissionModel.findById(id).exec();
  }

  update(inputData: PermissionInput) {
    return this.permissionModel
      .findByIdAndUpdate(inputData._id, inputData, { new: true })
      .exec();
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return this.permissionModel.findByIdAndDelete(id).exec();
  }
}
