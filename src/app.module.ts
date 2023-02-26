import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authenticateUserByRequest } from './app/auth/auth.middleware';
import { AuthModule } from './app/auth/auth.module';
import { AuthService } from './app/auth/auth.service';
import { BrandModule } from './app/masterdata/brand/brand.module';
import { UserModule } from './app/masterdata/user/user.module';
import { PermissionModule } from './app/masterdata/permission/permission.module';
import { BranchModule } from './app/masterdata/branch/branch.module';
import { CompanyModule } from './app/masterdata/company/company.module';

@Module({
  imports: [
    AuthModule,
    BranchModule,
    BrandModule,
    CompanyModule,
    PermissionModule,
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
          origin: '*',
          credentials: true,
        },
        context: async ({ req }) => {
          const user = await authenticateUserByRequest(authService, req);
          return { req, user, sample: 'heloworld' };
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
