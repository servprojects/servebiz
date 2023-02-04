import { InputType, Int, Field, PickType } from '@nestjs/graphql';
import { Brand, BrandInput } from '../entities/brand.entity';


@InputType()
export class UpsertBrandtInput extends PickType(BrandInput, [
  'name',
  'code',
  'weight',
  'createdBy',
  '_id',
]) {
  permission: 'client';
}
