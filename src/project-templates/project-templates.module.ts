import { Module } from '@nestjs/common';
import { ProjectTemplatesController } from './project-templates.controller.js';
import { ProjectTemplatesService } from './project-templates.service.js';

@Module({
  controllers: [ProjectTemplatesController],
  providers: [ProjectTemplatesService]
})
export class ProjectTemplatesModule {}
