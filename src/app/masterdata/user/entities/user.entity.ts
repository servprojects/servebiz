import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';

import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Permission,
  PermissionDocument,
} from '../../permission/entities/permission.entity';
import { Branch } from '../../branch/entities/branch.entity';
import { ContactDetails } from '@/app/embeded/contactDetails.dto';
import { Department } from '../../department/entities/department.entity';
import { PersonalDetails } from '@/app/embeded/personalDetails.dto';

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

  // EMBEDDED

  @Prop({ type: ContactDetails })
  @Field((type) => ContactDetails, { nullable: true })
  contactDetails: ContactDetails;

  @Prop({ type: PersonalDetails })
  @Field((type) => PersonalDetails, { nullable: true })
  personalDetails: PersonalDetails;

  // REFERENCES

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] })
  @Field((type) => [Permission], { nullable: true })
  permissions: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }] })
  @Field((type) => [Branch], { nullable: true })
  branches: mongoose.Schema.Types.ObjectId[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Branch',
  })
  @Field((type) => Branch, { nullable: true })
  branchOnDuty: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }] })
  @Field((type) => [Department], { nullable: true })
  departments: mongoose.Schema.Types.ObjectId[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Department',
  })
  @Field((type) => Department, { nullable: true })
  departmentOnDuty: mongoose.Schema.Types.ObjectId; 

  // IDS

  @Field((type) => [ID], { nullable: true })
  permissionIds: mongoose.Schema.Types.ObjectId[];

  @Field((type) => [ID], { nullable: true })
  branchIds: mongoose.Schema.Types.ObjectId[];

  @Field((type) => ID, { nullable: true })
  branchOnDutyId: mongoose.Schema.Types.ObjectId;

  @Field((type) => [ID], { nullable: true })
  departmentIds: mongoose.Schema.Types.ObjectId[];

  @Field((type) => ID, { nullable: true })
  departmentOnDutyId: mongoose.Schema.Types.ObjectId;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
