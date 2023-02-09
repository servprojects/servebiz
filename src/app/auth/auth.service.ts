import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '@/app/user/entities/user.entity';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ username: username });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
