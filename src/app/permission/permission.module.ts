import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { Permission, PermissionSchema } from './permission.model';
import { PermissionService } from './permission.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Permission.name, schema: PermissionSchema}]),
    ],
    providers: [PermissionService],
})
export class PermissionModule {}
