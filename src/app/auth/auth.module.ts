import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/app/user/entities/user.entity';
require('dotenv').config()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({ secret: 'JC816' }),
    // JwtModule.register({ secret: process.env.JWT }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
