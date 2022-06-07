<?php

namespace Database\Seeders;

use Arr;
use App\Models\Company;
use Faker\Factory;
use Illuminate\Database\Seeder;

class CompaniesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for ($i = 0; $i < 100; $i++) {
            Company::create([
                'name'          => $faker->words(3, true),
                'status'        => Arr::random([Company::TRIAL, Company::CUSTOMER, Company::DEAD]),
                'address'       => $faker->streetAddress,
                'started_at'    => $faker->dateTimeBetween('-01 years', 'now')
            ]);
        }
    }
}