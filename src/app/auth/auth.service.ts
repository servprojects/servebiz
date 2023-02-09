import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@/app/user/entities/user.entity';
import { Model, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthInput } from './dto/auth.input';
import { JwtService } from '@nestjs/jwt';
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
    console.log(token)
    if (token) {
      console.log(token)
      const data = this.jwtService.decode(token, { json: true }) as {
        sub: unknown;
      };

      if (data?.sub && !isNaN(Number(data.sub))) {
        const user = await this.userModel.findOne({ _id: data?.sub }).exec();
        return user || null;
      }
    }
    return null;
  }
}
