import { Test, TestingModule } from '@nestjs/testing';
import { CodeGeneratorController } from './code-generator.controller.js';

describe('CodeGeneratorController', () => {
  let controller: CodeGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeGeneratorController],
    }).compile();

    controller = module.get<CodeGeneratorController>(CodeGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
