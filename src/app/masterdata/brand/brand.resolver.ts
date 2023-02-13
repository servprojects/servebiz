import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { Brand  } from './entities/brand.entity';
import { BrandtInput } from './dto/brand.input';
import { Schema as MongooseSchema } from 'mongoose';

@Resolver(() => Brand)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Mutation(() => Brand)
  createBrand(@Args('inputs') createBrandInput: BrandtInput) {
    return this.brandService.create(createBrandInput);
  }

  @Query(() => [Brand], { name: 'brands' })
  findAll() {
    return this.brandService.findAll();
  }

  @Query(() => Brand, { name: 'brand' })
  findOne(@Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId) {
    return this.brandService.findOne(id);
  }

  @Mutation(() => Brand)
  updateBrand(@Args('updateBrandInput') updateBrandInput: BrandtInput) {
    return this.brandService.update( updateBrandInput);
  }

  @Mutation(() => Brand)
  removeBrand(@Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId) {
    return this.brandService.remove(id);
  }
}
