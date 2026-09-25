import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Submission, Prisma } from '@prisma/client';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  async submitAssignment(data: Prisma.SubmissionUncheckedCreateInput): Promise<Submission> {
    return this.prisma.submission.create({ data });
  }

  async gradeSubmission(id: string, score: number, feedback: string) {
    return this.prisma.assessment.create({
      data: {
        submissionId: id,
        score,
        feedback,
      }
    });
  }

  async getSubmissions(assignmentId: string): Promise<Submission[]> {
    return this.prisma.submission.findMany({ 
      where: { assignmentId },
      include: { Assessments: true }
    });
  }
}
