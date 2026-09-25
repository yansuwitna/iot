#!/bin/bash

# Overwrite Users
cat << 'EOF' > database/migrations/0001_01_01_000000_create_users_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('role')->default('GENERAL_USER');
            $table->foreignId('organization_id')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
EOF

# Organizations
FILE=$(ls database/migrations/*_create_organizations_table.php)
cat << 'EOF' > "$FILE"
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('organizations'); }
};
EOF

# Projects
FILE=$(ls database/migrations/*_create_projects_table.php)
cat << 'EOF' > "$FILE"
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->foreignId('organization_id')->constrained('organizations')->cascadeOnDelete();
            $table->foreignId('owner_id')->constrained('users')->cascadeOnDelete();
            $table->string('status')->default('DRAFT');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('projects'); }
};
EOF

# ProjectTemplates
FILE=$(ls database/migrations/*_create_project_templates_table.php)
cat << 'EOF' > "$FILE"
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('project_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('category');
            $table->text('description')->nullable();
            $table->string('difficulty');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('project_templates'); }
};
EOF

# Boards
FILE=$(ls database/migrations/*_create_boards_table.php)
cat << 'EOF' > "$FILE"
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('boards', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('manufacturer');
            $table->string('architecture');
            $table->string('chip');
            $table->string('supported_frameworks');
            $table->float('voltage');
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('boards'); }
};
EOF

# Components
FILE=$(ls database/migrations/*_create_components_table.php)
cat << 'EOF' > "$FILE"
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('components', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category');
            $table->text('description')->nullable();
            $table->string('pin_requirement');
            $table->string('input_type');
            $table->string('output_type');
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('components'); }
};
EOF

# Devices
FILE=$(ls database/migrations/*_create_devices_table.php)
cat << 'EOF' > "$FILE"
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('devices', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('device_name');
            $table->string('device_type');
            $table->foreignId('organization_id')->constrained('organizations')->cascadeOnDelete();
            $table->foreignId('project_id')->nullable()->constrained('projects')->nullOnDelete();
            $table->uuid('device_secret')->unique();
            $table->string('status')->default('OFFLINE');
            $table->timestamp('last_seen')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('devices'); }
};
EOF

# Telemetry Readings
FILE=$(ls database/migrations/*_create_telemetry_readings_table.php)
cat << 'EOF' > "$FILE"
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('telemetry_readings', function (Blueprint $table) {
            $table->id();
            $table->uuid('device_id');
            $table->foreign('device_id')->references('id')->on('devices')->cascadeOnDelete();
            $table->json('payload');
            $table->timestamp('timestamp')->useCurrent();
            $table->index(['device_id', 'timestamp']);
        });
    }
    public function down(): void { Schema::dropIfExists('telemetry_readings'); }
};
EOF

# ProjectVersions
FILE=$(ls database/migrations/*_create_project_versions_table.php)
cat << 'EOF' > "$FILE"
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('project_versions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->string('version_name');
            $table->longText('code');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('project_versions'); }
};
EOF

# Class Models
FILE=$(ls database/migrations/*_create_class_models_table.php)
cat << 'EOF' > "$FILE"
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('class_models', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('organization_id')->constrained('organizations')->cascadeOnDelete();
            $table->foreignId('teacher_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('class_models'); }
};
EOF

# Class Members
FILE=$(ls database/migrations/*_create_class_members_table.php)
cat << 'EOF' > "$FILE"
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('class_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_model_id')->constrained('class_models')->cascadeOnDelete();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('class_members'); }
};
EOF

# Assignments
FILE=$(ls database/migrations/*_create_assignments_table.php)
cat << 'EOF' > "$FILE"
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignId('class_model_id')->constrained('class_models')->cascadeOnDelete();
            $table->timestamp('due_date')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('assignments'); }
};
EOF

# Submissions
FILE=$(ls database/migrations/*_create_submissions_table.php)
cat << 'EOF' > "$FILE"
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assignment_id')->constrained('assignments')->cascadeOnDelete();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('project_id')->nullable()->constrained('projects')->nullOnDelete();
            $table->text('content')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('submissions'); }
};
EOF

# Assessments
FILE=$(ls database/migrations/*_create_assessments_table.php)
cat << 'EOF' > "$FILE"
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submission_id')->constrained('submissions')->cascadeOnDelete();
            $table->float('score');
            $table->text('feedback')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('assessments'); }
};
EOF

# Branding Settings
FILE=$(ls database/migrations/*_create_branding_settings_table.php)
cat << 'EOF' > "$FILE"
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('branding_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->unique()->constrained('organizations')->cascadeOnDelete();
            $table->string('application_name')->default('IoT Project Learning Platform');
            $table->string('logo_url')->nullable();
            $table->string('favicon_url')->nullable();
            $table->string('primary_color')->default('#3b82f6');
            $table->string('secondary_color')->default('#1d4ed8');
            $table->string('background_color')->default('#ffffff');
            $table->string('timezone')->default('Asia/Jakarta');
            $table->string('language')->default('id');
            $table->string('contact_email')->nullable();
            $table->text('footer_text')->nullable();
            $table->string('custom_domain')->unique()->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('branding_settings'); }
};
EOF

echo "All migrations overwritten successfully!"
