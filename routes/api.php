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

Route::get('athletes', 'AthletesController@index');
Route::get('/get_athlete_sports/{athlete_id}', ['uses' =>'AthletesController@getAssociatedSports']);
Route::post('add_athlete','AthletesController@store');
Route::get('/add_athlete_sports/{athlete_id}/{sport_id}', ['uses' =>'AthletesController@addSportsForAthlete']);

Route::get('sports', 'SportsController@index');
Route::post('add_sport','SportsController@store');

Route::get('teams', 'TeamsController@index');
Route::post('add_team','TeamsController@store');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
