import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { TelemetryReading } from '@prisma/client';

@Injectable()
export class TelemetryService {
  constructor(private prisma: PrismaService) {}

  async saveTelemetry(deviceId: string, payload: any): Promise<TelemetryReading> {
    // Also update device lastSeen
    await this.prisma.device.update({
      where: { id: deviceId },
      data: { lastSeen: new Date(), status: 'ONLINE' },
    });

    return this.prisma.telemetryReading.create({
      data: {
        deviceId,
        payload,
      }
    });
  }

  async getTelemetry(deviceId: string, limit: number = 100): Promise<TelemetryReading[]> {
    return this.prisma.telemetryReading.findMany({
      where: { deviceId },
      orderBy: { timestamp: 'desc' },
      take: Number(limit),
    });
  }
}
