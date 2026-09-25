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
