<?php

namespace Database\Seeders;

use App\Models\Employee;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Generate 10 dummy records

        $faker = Faker::create();
        for ($i = 1; $i <= 10; $i++) {
            Employee::create([
                'name' => Str::random(10),
                'email' => Str::random(10).'@gmail.com',
                'phone' => $faker->phoneNumber,
                'position' => Str::random(5) . ' ' . 'Position',
            ]);
        }
    }
}
