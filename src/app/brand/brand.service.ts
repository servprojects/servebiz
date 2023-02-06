import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand, BrandDocument } from './entities/brand.entity';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { BrandtInput } from './dto/brand.input';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
  ) {}

  create(createBrandInput: BrandtInput) {
    const createdBrand = new this.brandModel(createBrandInput);
    return createdBrand.save();
  }

  findAll() {
    return this.brandModel.find({}).exec();
  }

  findOne(id: MongooseSchema.Types.ObjectId) {
    return this.brandModel.findById(id).exec();
  }

  update(updateBrandInput: BrandtInput) {
    return this.brandModel
      .findByIdAndUpdate(updateBrandInput._id, updateBrandInput, { new: true })
      .exec();
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return this.brandModel.findByIdAndDelete(id).exec();
  }
}
