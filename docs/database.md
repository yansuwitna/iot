# Database Design

## Database Strategy
- MySQL 8.x with InnoDB
- Prisma ORM
- UTF-8 (utf8mb4)
- Multi-tenancy achieved via `tenant_id` columns in relevant tables.

## Core Tables
1. **Identity & Access Management**: `users`, `organizations`, `organization_members`, `roles`, `permissions`, `role_permissions`, `user_roles`.
2. **Settings**: `tenant_settings`, `branding_settings`, `audit_logs`.
3. **Projects Engine**: `projects`, `project_templates`, `project_versions`, `project_members`, `project_components`, `project_logic_blocks`, `project_dashboards`.
4. **IoT Registry**: `boards`, `board_pins`, `components`, `component_templates`, `component_compatibilities`, `code_templates`.
5. **Devices & Telemetry**: `devices`, `device_credentials`, `device_events`, `telemetry_readings`, `device_commands`.
6. **Learning Module**: `classes`, `class_members`, `lessons`, `learning_activities`, `assignments`, `submissions`, `rubrics`, `rubric_items`, `assessments`, `reflections`.
