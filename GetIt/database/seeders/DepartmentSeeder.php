<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
            'name' => 'Electronics',
            'slug' => 'electronics',
            'active' => true,
            'created_at' => now(),
            'updated_at' => now()
            ],
            [
            'name' => 'Furniture',
            'slug' => 'furniture',
            'active' => true,
            'created_at' => now(),
            'updated_at' => now()
            ],
            [
            'name' => 'Clothing',
            'slug' => 'clothing',
            'active' => true,
            'created_at' => now(),
            'updated_at' => now()
            ],
            [
            'name' => 'Books',
            'slug' => 'books',
            'active' => true,
            'created_at' => now(),
            'updated_at' => now()
            ],
            [
            'name' => 'Toys',
            'slug' => 'toys',
            'active' => true,
            'created_at' => now(),
            'updated_at' => now()
            ],
        ];
        DB::table('departments')->insert($departments);
    }
}
