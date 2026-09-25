import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { BrandingService } from './branding.service.js';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard, Roles } from '../auth/roles.guard.js';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('branding')
export class BrandingController {
  constructor(private readonly brandingService: BrandingService) {}

  @Get()
  async getBranding(@Request() req: any) {
    return this.brandingService.getBranding(req.user.organizationId);
  }

  @Roles(Role.TENANT_OWNER, Role.SUPER_ADMIN)
  @Put()
  async updateBranding(@Body() body: any, @Request() req: any) {
    return this.brandingService.updateBranding(req.user.organizationId, body);
  }
}
