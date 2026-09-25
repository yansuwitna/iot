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
