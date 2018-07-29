<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        factory(App\User::class, 20)->create();
        factory(App\Athlete::class, 20)->create();
        factory(App\Sport::class, 20)->create();
        factory(App\Team::class, 20)->create();
    }
}
