import { Document, Schema as MongooseSchema } from 'mongoose';

import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ContactDetails } from '@/app/embeded/contactDetails.dto';

@InputType('CompanyType', { isAbstract: true })
@ObjectType()
@Schema()
export class Company {
  @Field((type) => ID, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field((type) => String)
  name: string;

  @Prop({ required: true })
  @Field((type) => String)
  code: string;

  @Prop({ type: ContactDetails})
  @Field((type) => ContactDetails, { nullable: true })
  contactDetails: ContactDetails;
}

export type CompanyDocument = Company & Document;
export const CompanySchema = SchemaFactory.createForClass(Company);
