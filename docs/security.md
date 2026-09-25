# Security Plan

- Password hashing using secure algorithms (e.g., bcrypt/argon2).
- JWT or Session-based authentication.
- Strict Role-Based Access Control (RBAC).
- Input validation (Zod / class-validator).
- Output encoding to prevent XSS.
- Rate limiting for API requests.
- Strict CORS configuration.
- Tenant isolation: All queries must enforce `tenant_id`.
- IDOR protection: Validate ownership/permissions for every resource.
- No secrets in logs or source code.
