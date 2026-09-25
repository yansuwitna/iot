# Architecture
## Overview
IoT Project Learning Platform is a multi-tenant, self-hosted, and hosting-ready application designed for educational and custom IoT projects.

## Architecture Pattern
Modular Monolith with separated frontend and backend in a monorepo setup.

## Technology Stack
- **Backend**: Node.js (NestJS), TypeScript, Prisma ORM, MySQL 8.x
- **Frontend**: Vue 3, Vite, Tailwind CSS, Pinia
- **IoT Target**: ESP32, Arduino Uno (HTTP REST Telemetry)
- **Deployment**: Shared Hosting (Node.js/MySQL), VPS, Docker, Local Server

## Modularity
- Authentication, Authorization, Tenant Management
- Project Engine, Template Management
- Board & Component Registry, Logic Builder, Code Generator
- Device Management, Telemetry
- Learning Management, Assessment
