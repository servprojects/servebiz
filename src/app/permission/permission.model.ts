import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';

export class Permission {
    _id: MongooseSchema.Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    code: string;

    @Prop()
    weight: string;
}

export type PermissionDocument = Permission & Document;
export const PermissionSchema = SchemaFactory.createForClass(Permission);