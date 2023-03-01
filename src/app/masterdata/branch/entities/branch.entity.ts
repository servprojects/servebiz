import { Document, Schema as MongooseSchema } from 'mongoose';

import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Company
} from '../../company/entities/company.entity';
import * as mongoose from 'mongoose';

@InputType('BranchType', { isAbstract: true })
@ObjectType()
@Schema()
export class Branch {
  @Field((type) => ID, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field((type) => String)
  name: string;

  @Prop({ required: true })
  @Field((type) => String)
  code: string;

  // REFERENCES
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Company',
  })
  @Field((type) => Company, { nullable: true })
  company: Company;
  // IDS

  @Field((type) => ID, { nullable: true })
  companyId: mongoose.Schema.Types.ObjectId;
}

export type BranchDocument = Branch & Document;
export const BranchSchema = SchemaFactory.createForClass(Branch);
