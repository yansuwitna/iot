import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { BrandingSetting, Prisma } from '@prisma/client';

@Injectable()
export class BrandingService {
  constructor(private prisma: PrismaService) {}

  async getBranding(organizationId: string): Promise<BrandingSetting | null> {
    return this.prisma.brandingSetting.findUnique({
      where: { organizationId },
    });
  }

  async updateBranding(organizationId: string, data: Prisma.BrandingSettingUpdateInput): Promise<BrandingSetting> {
    return this.prisma.brandingSetting.upsert({
      where: { organizationId },
      update: data,
      create: {
        ...(data as any), // Simplify for foundational implementation
        organization: { connect: { id: organizationId } }
      }
    });
  }
}
