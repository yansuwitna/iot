import { Controller, Post, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { DevicesService } from './devices.service.js';
import { AuthGuard } from '@nestjs/passport';
import { TenantGuard } from '../auth/tenant.guard.js';

@UseGuards(AuthGuard('jwt'), TenantGuard)
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  async registerDevice(@Body() body: any, @Request() req: any) {
    // Inject organization ID from JWT
    const data = {
      ...body,
      organizationId: req.user.organizationId,
    };
    return this.devicesService.registerDevice(data);
  }

  @Get()
  async getDevices(@Request() req: any) {
    return this.devicesService.getDevices(req.user.organizationId);
  }

  @Post(':id/revoke-credential')
  async revokeCredential(@Param('id') id: string) {
    return this.devicesService.revokeCredential(id);
  }
}
