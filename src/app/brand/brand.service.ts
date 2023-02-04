import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { CreateBrandInput } from './dto/create-brand.input';
// import { UpdateBrandInput } from './dto/update-brand.input';
import { Brand, BrandDocument } from './entities/brand.entity';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { UpsertBrandtInput } from './dto/brand.input';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
  ) {}

  create(createBrandInput: UpsertBrandtInput) {
    const createdBrand = new this.brandModel(createBrandInput);
    return createdBrand.save();
  }

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  // update(id: number, updateBrandInput: UpdateBrandInput) {
  //   return `This action updates a #${id} brand`;
  // }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
