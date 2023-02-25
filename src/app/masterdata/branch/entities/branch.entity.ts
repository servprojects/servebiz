import { Document, Schema as MongooseSchema } from 'mongoose';

import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company, CompanyDocument } from '../../company/entities/branch.entity';

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

  @Prop()
  @Field((type) => Company)
  Company: CompanyDocument;
}

export type BranchDocument = Branch & Document;
export const BranchSchema = SchemaFactory.createForClass(Branch);
