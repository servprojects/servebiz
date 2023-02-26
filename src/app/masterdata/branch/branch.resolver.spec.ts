import { Test, TestingModule } from '@nestjs/testing';

import { BranchResolver } from './branch.resolver';
import { BranchService } from './branch.service';

describe('BranchResolver', () => {
  let resolver: BranchResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchResolver, BranchService],
    }).compile();

    resolver = module.get<BranchResolver>(BranchResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
