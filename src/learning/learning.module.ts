import { Module } from '@nestjs/common';
import { ClassesController } from './classes/classes.controller.js';
import { ClassesService } from './classes/classes.service.js';
import { AssignmentsController } from './assignments/assignments.controller.js';
import { AssignmentsService } from './assignments/assignments.service.js';
import { SubmissionsController } from './submissions/submissions.controller.js';
import { SubmissionsService } from './submissions/submissions.service.js';

@Module({
  controllers: [ClassesController, AssignmentsController, SubmissionsController],
  providers: [ClassesService, AssignmentsService, SubmissionsService]
})
export class LearningModule {}
