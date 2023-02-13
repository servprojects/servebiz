import * as bcrypt from 'bcrypt';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserInput } from './dto/user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserInput: UserInput) {
    const password = await bcrypt.hash(createUserInput.password, 10);

    const createdUser = new this.userModel({
      username: createUserInput.username,
      password: password,
    });
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find({}).exec();
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
