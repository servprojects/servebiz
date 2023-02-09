import { ObjectType, InputType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@InputType('UserType', { isAbstract: true })
@ObjectType()
@Schema()
export class User  {
  @Field((type) => ID, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field((type) => String)
  username: string;

  @Prop()
  @Field((type) => String)
  password: string;
}

// @InputType('UserInputType', { isAbstract: true })
// @ObjectType()
// export class UserInputType extends UserCommon {
//   @Prop()
//   @Field((type) => String, { nullable: true })
//   createdBy: string;
// }

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
