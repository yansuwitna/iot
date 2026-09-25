import { Module } from '@nestjs/common';
import { CodeGeneratorController } from './code-generator.controller.js';
import { CodeGeneratorService } from './code-generator.service.js';

@Module({
  controllers: [CodeGeneratorController],
  providers: [CodeGeneratorService]
})
export class CodeGeneratorModule {}
