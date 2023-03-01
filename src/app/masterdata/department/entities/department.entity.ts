import { Document, Schema as MongooseSchema } from 'mongoose';

import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@InputType('DepartmentType', { isAbstract: true })
@ObjectType()
@Schema()
export class Department {
  @Field((type) => ID, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field((type) => String)
  name: string;

  @Prop({ required: true })
  @Field((type) => String)
  code: string;
  
}

export type DepartmentDocument = Department & Document;
export const DepartmentSchema = SchemaFactory.createForClass(Department);
