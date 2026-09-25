import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { BoardsModule } from './boards/boards.module.js';
import { ComponentsModule } from './components/components.module.js';
import { ProjectTemplatesModule } from './project-templates/project-templates.module.js';
import { CodeGeneratorModule } from './code-generator/code-generator.module.js';
import { DevicesModule } from './devices/devices.module.js';
import { TelemetryModule } from './telemetry/telemetry.module.js';
import { LearningModule } from './learning/learning.module.js';
import { BrandingModule } from './branding/branding.module.js';

@Module({
  imports: [
    PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'client', 'dist'),
      exclude: ['/api/(.*)'],
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    BoardsModule,
    ComponentsModule,
    ProjectTemplatesModule,
    CodeGeneratorModule,
    DevicesModule,
    TelemetryModule,
    LearningModule,
    BrandingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
