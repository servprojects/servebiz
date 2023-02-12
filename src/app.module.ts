import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BrandModule } from './app/brand/brand.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './app/user/user.module';
import { UserService } from './app/user/user.service';
import { AuthModule } from './app/auth/auth.module';
import { authenticateUserByRequest } from './app/auth/auth.middleware';
import { AuthService } from './app/auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './app/guard/accessToken.guard';
import { AuthGuard } from './app/guard/auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@/app/user/entities/user.entity';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    AuthModule,
    BrandModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/servebiz-official'),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [AuthService],
      useFactory: (authService: AuthService) => ({
        playground: true,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        cors: {
          origin: 'http://localhost:48992',
          credentials: true
        },
        context: async ({ req }) => {
          const user = await authenticateUserByRequest(authService, req)
          return { req, user, sample: "heloworld"  }
        }
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
  // providers: [AppService, { provide: APP_GUARD, useClass: AccessTokenGuard}],
})
export class AppModule {}
