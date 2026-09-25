import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Class, Prisma } from '@prisma/client';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async createClass(data: Prisma.ClassUncheckedCreateInput): Promise<Class> {
    return this.prisma.class.create({ data });
  }

  async getClasses(organizationId: string): Promise<Class[]> {
    return this.prisma.class.findMany({ 
      where: { organizationId },
      include: { teacher: true }
    });
  }

  async enrollStudent(classId: string, studentId: string) {
    return this.prisma.classMember.create({
      data: { classId, studentId }
    });
  }
}
