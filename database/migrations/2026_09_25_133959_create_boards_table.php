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
