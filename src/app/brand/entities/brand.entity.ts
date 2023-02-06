import { ObjectType, InputType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@InputType('BrandCommonType', { isAbstract: true })
@ObjectType()
@Schema()
export class BrandCommon {
  @Field((type) => ID, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field((type) => String)
  name: string;

  @Prop()
  @Field((type) => String)
  code: string;

  @Prop()
  @Field((type) => String)
  weight: string;
}


@ObjectType()
@Schema()
export class Brand extends BrandCommon {
  @Prop()
  @Field((type) => String)
  createdBy: string;
}

@InputType('BrandInputType', { isAbstract: true })
@ObjectType()
export class BrandInputType extends BrandCommon {
  @Prop()
  @Field((type) => String, { nullable: true })
  createdBy: string;
}

export type BrandDocument = Brand & Document;
export const BrandSchema = SchemaFactory.createForClass(Brand);
