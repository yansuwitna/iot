import { Controller, Post, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ClassesService } from './classes.service.js';
import { AuthGuard } from '@nestjs/passport';
import { TenantGuard } from '../../auth/tenant.guard.js';

@UseGuards(AuthGuard('jwt'), TenantGuard)
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  async createClass(@Body() body: any, @Request() req: any) {
    const data = {
      ...body,
      organizationId: req.user.organizationId,
      teacherId: req.user.id,
    };
    return this.classesService.createClass(data);
  }

  @Get()
  async getClasses(@Request() req: any) {
    return this.classesService.getClasses(req.user.organizationId);
  }

  @Post(':id/enroll')
  async enrollStudent(@Param('id') classId: string, @Body('studentId') studentId: string) {
    return this.classesService.enrollStudent(classId, studentId);
  }
}
