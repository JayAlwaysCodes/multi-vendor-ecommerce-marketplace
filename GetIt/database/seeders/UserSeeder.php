<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\RolesEnum;
use App\Enums\PermissionsEnum;
use App\Enums\VendorStatusEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'User',
            'email' => 'user@example.com'
        ]);
        $user ->assignRole(RolesEnum::User->value);

        Vendor::factory()->create([
            'user_id' => $user->id,
            'status' => VendorStatusEnum::Approved,
            'store_name' => 'Vendor Store',
            'store_address' => fake()->address(),
        ]);

        User::factory()->create([
            'name' => 'Vendor',
            'email' => 'vendor@example.com'
        ])->assignRole(RolesEnum::Vendor->value);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com'
        ])->assignRole(RolesEnum::Admin->value);
    }
}
