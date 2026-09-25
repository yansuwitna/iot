import { Controller, Post, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { SubmissionsService } from './submissions.service.js';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('assignments/:assignmentId/submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  async submitAssignment(@Param('assignmentId') assignmentId: string, @Body() body: any, @Request() req: any) {
    const data = {
      ...body,
      assignmentId,
      studentId: req.user.id,
    };
    return this.submissionsService.submitAssignment(data);
  }

  @Get()
  async getSubmissions(@Param('assignmentId') assignmentId: string) {
    return this.submissionsService.getSubmissions(assignmentId);
  }

  @Post(':id/grade')
  async gradeSubmission(@Param('id') submissionId: string, @Body() body: { score: number; feedback: string }) {
    return this.submissionsService.gradeSubmission(submissionId, body.score, body.feedback);
  }
}
