import { Document, Schema as MongooseSchema } from 'mongoose';

import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@InputType('PermissionType', { isAbstract: true })
@ObjectType()
@Schema()
export class Permission {
  @Field((type) => ID, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field((type) => String)
  name: string;

  @Prop({ required: true })
  @Field((type) => String)
  code: string;

  @Prop()
  @Field((type) => Number)
  weight: string;
}

export type PermissionDocument = Permission & Document;
export const PermissionSchema = SchemaFactory.createForClass(Permission);
