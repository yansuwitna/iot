<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Organization;
use App\Models\Board;
use App\Models\Component;
use App\Models\ProjectTemplate;
use App\Models\BrandingSetting;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $org = Organization::create([
            'name' => 'Default Organization',
            'slug' => 'default-org',
        ]);

        BrandingSetting::create([
            'organization_id' => $org->id,
            'application_name' => 'Smart School IoT'
        ]);

        User::create([
            'name' => 'Admin User',
            'email' => 'admin',
            'password' => Hash::make('Admin!'),
            'role' => 'SUPER_ADMIN',
            'organization_id' => $org->id,
        ]);

        Board::insert([
            ['name' => 'ESP32 DevKit V1', 'manufacturer' => 'Espressif', 'architecture' => 'Xtensa', 'chip' => 'ESP32', 'supported_frameworks' => 'Arduino, ESP-IDF', 'voltage' => 3.3],
            ['name' => 'Arduino Uno R3', 'manufacturer' => 'Arduino', 'architecture' => 'AVR', 'chip' => 'ATmega328P', 'supported_frameworks' => 'Arduino', 'voltage' => 5.0],
        ]);

        Component::insert([
            ['name' => 'LED', 'category' => 'Actuator', 'description' => 'Light Emitting Diode', 'pin_requirement' => 'Digital', 'input_type' => 'None', 'output_type' => 'Digital'],
            ['name' => 'DHT22', 'category' => 'Sensor', 'description' => 'Temperature and Humidity Sensor', 'pin_requirement' => 'Digital', 'input_type' => 'Digital', 'output_type' => 'None'],
            ['name' => 'Soil Moisture', 'category' => 'Sensor', 'description' => 'Analog Soil Moisture Sensor', 'pin_requirement' => 'Analog', 'input_type' => 'Analog', 'output_type' => 'None'],
        ]);

        ProjectTemplate::insert([
            ['name' => 'Smart Garden', 'slug' => 'smart-garden', 'category' => 'SMART_GARDEN', 'description' => 'A basic smart garden project.', 'difficulty' => 'Beginner'],
            ['name' => 'Smart Home', 'slug' => 'smart-home', 'category' => 'SMART_HOME', 'description' => 'A basic smart home project.', 'difficulty' => 'Intermediate'],
        ]);
    }
}
