import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DeviceAuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const deviceId = request.params.id;
    const deviceSecret = request.headers['x-device-secret'];

    if (!deviceId || !deviceSecret) {
      throw new UnauthorizedException('Missing device ID or secret');
    }

    const device = await this.prisma.device.findUnique({
      where: { id: deviceId },
    });

    if (!device || device.deviceSecret !== deviceSecret) {
      throw new UnauthorizedException('Invalid device credentials');
    }

    // Attach device to request for downstream use
    request.device = device;
    return true;
  }
}
