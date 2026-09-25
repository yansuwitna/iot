import { Test, TestingModule } from '@nestjs/testing';
import { BrandingService } from './branding.service.js';

describe('BrandingService', () => {
  let service: BrandingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandingService],
    }).compile();

    service = module.get<BrandingService>(BrandingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
