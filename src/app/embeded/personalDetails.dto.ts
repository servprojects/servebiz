import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@InputType('PersonalDetailsType', { isAbstract: true })
@ObjectType()
@Schema()
export class PersonalDetails {
  @Prop({ required: true })
  @Field((type) => String)
  firstName: string;

  @Prop({ required: true })
  @Field((type) => String)
  lastName: string;

  @Prop({ required: true })
  @Field((type) => String)
  middleName: string;
}

export type PersonalDetailsDocument = PersonalDetails & Document;
export const PersonalDetailsSchema =
  SchemaFactory.createForClass(PersonalDetails);
