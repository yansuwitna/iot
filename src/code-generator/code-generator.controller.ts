import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { CodeGeneratorService, CodeGenConfig } from './code-generator.service.js';
import { AuthGuard } from '@nestjs/passport';
import { TenantGuard } from '../auth/tenant.guard.js';

@UseGuards(AuthGuard('jwt'), TenantGuard)
@Controller('projects/:id/code')
export class CodeGeneratorController {
  constructor(private readonly codeGeneratorService: CodeGeneratorService) {}

  @Post('generate')
  async generateCode(@Param('id') projectId: string, @Body() config: CodeGenConfig) {
    const code = this.codeGeneratorService.generateCode(config);
    const versionName = `Auto-generated ${new Date().toISOString()}`;
    await this.codeGeneratorService.saveCodeVersion(projectId, code, versionName);
    return { success: true, code, versionName };
  }

  @Get('versions')
  async getVersions(@Param('id') projectId: string) {
    return this.codeGeneratorService.getVersions(projectId);
  }
}
