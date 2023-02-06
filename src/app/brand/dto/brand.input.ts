import { InputType, Int, Field, PickType } from '@nestjs/graphql';
import { Brand, BrandInputType } from '../entities/brand.entity';


@InputType()
export class BrandtInput extends PickType(BrandInputType, [
  'name',
  'code',
  'weight',
  'createdBy',
  '_id',
]) {
  permission: 'client';
}
