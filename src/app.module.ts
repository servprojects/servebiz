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

@Module({
  imports: [
    AuthModule,
    BrandModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/servebiz-official'),
    GraphQLModule.forRoot({
      // GraphQLModule.forRootAsync<ApolloDriverConfig>({
      // imports: [AuthModule],
      inject: [AuthService],
      driver: ApolloDriver,
      debug: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      useFactory: (authService: AuthService) => ({
        cors: {
          origin: 'http://localhost:3000',
          credentials: true,
        },
        context: async ({ req }) => {
          const user = await authenticateUserByRequest(authService, req);
          return { req, user };
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
