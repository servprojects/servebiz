import { Test, TestingModule } from '@nestjs/testing';
import { BrandResolver } from './brand.resolver';
import { BrandService } from './brand.service';

describe('BrandResolver', () => {
  let resolver: BrandResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandResolver, BrandService],
    }).compile();

    resolver = module.get<BrandResolver>(BrandResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
