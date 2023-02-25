import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';

import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Permission,
  PermissionDocument,
} from '../../permission/entities/permission.entity';

@InputType('UserType', { isAbstract: true })
@ObjectType()
@Schema()
export class User {
  @Field((type) => ID, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field((type) => String)
  username: string;

  @Prop({ required: true })
  @Field((type) => String)
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] })
  @Field((type) => [Permission])
  permissions: Permission[];

  @Field((type) => [String])
  permissionIds: string[];
}

// @InputType('UserPrivateInputType', { isAbstract: true })
// @ObjectType()
// export class UserPrivate extends User {

// }

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
