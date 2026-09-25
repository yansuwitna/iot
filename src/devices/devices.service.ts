import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma, Device } from '@prisma/client';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  async registerDevice(data: Prisma.DeviceUncheckedCreateInput): Promise<Device> {
    return this.prisma.device.create({ data });
  }

  async getDevices(organizationId: string): Promise<Device[]> {
    return this.prisma.device.findMany({ where: { organizationId } });
  }

  async revokeCredential(deviceId: string): Promise<Device> {
    const newSecret = require('crypto').randomUUID();
    return this.prisma.device.update({
      where: { id: deviceId },
      data: { deviceSecret: newSecret },
    });
  }
}
