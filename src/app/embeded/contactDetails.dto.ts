import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@InputType('ContactDetailsType', { isAbstract: true })
@ObjectType()
@Schema()
export class ContactDetails {
  @Prop({ required: true })
  @Field((type) => String)
  contactPerson: string;

  @Prop({ required: true })
  @Field((type) => String)
  mobileNumber: string;

  @Prop({ required: true })
  @Field((type) => String)
  email: string;

  @Prop({ required: true })
  @Field((type) => String)
  address: string;

  @Prop({ required: true })
  @Field((type) => String)
  telephone: string;
}

export type ContactDetailsDocument = ContactDetails & Document;
export const ContactDetailsSchema =
  SchemaFactory.createForClass(ContactDetails);
