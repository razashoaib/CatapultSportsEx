<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Athlete::class, function (Faker $faker) {
    return [
        'athlete_name' => $faker->unique()->name,
        'athlete_dob' => '1990/05/01',
        'athlete_age' => $faker->numberBetween(1,100),
        'athlete_height' => $faker->numberBetween(100,350),
        'athlete_body_weight' => $faker->numberBetween(100,300),
    ];
});

$factory->define(App\Sport::class, function (Faker $faker) {
    return [
        'sport_name' => 'Sport ' . $faker->unique()->company,
    ];
});

$factory->define(App\Team::class, function (Faker $faker) {
    return [
        'team_name' => $faker->unique()->company. ' Team',
        'team_logo' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc_oag6XbBq3XUBbo1ZZaXNt3UvCyozzLdiKiVfmNMzO0eZKiJ',
        'sport_id' => $faker->numberBetween(1,20),
    ];
});

