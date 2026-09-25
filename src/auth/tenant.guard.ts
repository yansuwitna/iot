import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const REQUIRE_TENANT_KEY = 'requireTenant';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireTenant = this.reflector.getAllAndOverride<boolean>(REQUIRE_TENANT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireTenant) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const requestedTenantId = request.headers['x-tenant-id'] || request.body.tenantId || request.params.tenantId;

    if (!user || !user.organizationId) {
      throw new ForbiddenException('User does not belong to a tenant');
    }

    // Super admin can bypass tenant checks if needed, but for now we enforce exact match
    if (requestedTenantId && user.organizationId !== requestedTenantId && user.role !== 'SUPER_ADMIN') {
      throw new ForbiddenException('Cross-tenant access is forbidden');
    }

    return true;
  }
}
