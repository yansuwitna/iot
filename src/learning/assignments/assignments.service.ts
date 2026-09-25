import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Assignment, Prisma } from '@prisma/client';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async createAssignment(data: Prisma.AssignmentUncheckedCreateInput): Promise<Assignment> {
    return this.prisma.assignment.create({ data });
  }

  async getAssignmentsByClass(classId: string): Promise<Assignment[]> {
    return this.prisma.assignment.findMany({ where: { classId } });
  }
}
