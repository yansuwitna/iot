import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service.js';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('classes/:classId/assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  async createAssignment(@Param('classId') classId: string, @Body() body: any) {
    return this.assignmentsService.createAssignment({ ...body, classId });
  }

  @Get()
  async getAssignments(@Param('classId') classId: string) {
    return this.assignmentsService.getAssignmentsByClass(classId);
  }
}
