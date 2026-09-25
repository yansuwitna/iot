import { Controller, Post, Get, Param, Body, UseGuards, Query } from '@nestjs/common';
import { TelemetryService } from './telemetry.service.js';
import { DeviceAuthGuard } from './device-auth.guard.js';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  // Device pushing data (Uses DeviceAuthGuard instead of JWT)
  @UseGuards(DeviceAuthGuard)
  @Post('devices/:id/telemetry')
  async postTelemetry(@Param('id') deviceId: string, @Body() payload: any) {
    return this.telemetryService.saveTelemetry(deviceId, payload);
  }

  // Frontend querying data (Uses JWT Auth)
  @UseGuards(AuthGuard('jwt'))
  @Get('devices/:id/telemetry')
  async getTelemetry(@Param('id') deviceId: string, @Query('limit') limit: number) {
    return this.telemetryService.getTelemetry(deviceId, limit);
  }
}
