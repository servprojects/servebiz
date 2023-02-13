import * as bcrypt from 'bcrypt';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { User, UserDocument } from '@/app/masterdata/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import { AuthInput } from './dto/auth.input';
import { AuthResponse } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signin(signinInput: AuthInput): Promise<AuthResponse> {
    const user = await this.userModel
      .findOne({ username: signinInput.username })
      .exec();

    if (user) {
      const passwordIsCorrect = await bcrypt.compare(
        signinInput.password,
        user.password,
      );

      if (passwordIsCorrect) {
        const token = this.jwtService.sign(
          { sub: user._id },
          { expiresIn: '30 days' },
        );

        return { user, token };
      }
    }

    throw new Error('Username or password is incorrect');
  }

  

  async me(token: string): Promise<User | null> {
    
    if (token) {
      const data = this.jwtService.decode(token, { json: true }) as {
        sub: unknown;
      };

      if (data?.sub) {
        const user = await this.userModel.findOne({ _id: data?.sub }).exec();
        return user || null;
      }
    }
    return null;
  }
}
