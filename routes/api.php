<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'Auth\PassportController@login');
Route::post('register', 'Auth\PassportController@register');

Route::get('athletes', 'AthletesController@index');
Route::get('/get_athlete_sports/{athlete_id}', ['uses' =>'AthletesController@getAssociatedSports']);
Route::post('add_athlete','AthletesController@store');
Route::post('/add_athlete_sports', 'AthletesController@addSportsForAthlete');
Route::post('/add_athlete_teams', 'AthletesController@addTeamsForAthlete');

Route::get('sports', 'SportsController@index');
Route::post('add_sport','SportsController@store');

// Route::get('teams', 'TeamsController@index');
Route::post('add_team','TeamsController@store');

Route::group(['middleware' => 'auth:api'], function(){
	Route::get('teams', 'TeamsController@index');
});

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
