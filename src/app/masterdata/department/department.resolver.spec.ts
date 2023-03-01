import { Test, TestingModule } from '@nestjs/testing';

import { DepartmentResolver } from './department.resolver';
import { DepartmentService } from './department.service';

describe('DepartmentResolver', () => {
  let resolver: DepartmentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentResolver, DepartmentService],
    }).compile();

    resolver = module.get<DepartmentResolver>(DepartmentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
