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
