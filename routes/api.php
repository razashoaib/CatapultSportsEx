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

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('athletes', 'AthletesController@index');
    Route::get('/get_athlete_sports/{athlete_id}', ['uses' =>'AthletesController@getAssociatedSports']);
    Route::get('edit_athletes/{id}', 'AthletesController@edit');
    Route::post('add_athlete','AthletesController@store');
    Route::post('/add_athlete_sports', 'AthletesController@addSportsForAthlete');
    Route::post('/add_athlete_teams', 'AthletesController@addTeamsForAthlete');
    Route::post('update_athlete/{id}','AthletesController@update');
    Route::post('delete_athlete/{id}','AthletesController@destroy');

    Route::get('sports', 'SportsController@index');
    Route::get('edit_sports/{id}', 'SportsController@edit');
    Route::post('add_sport','SportsController@store');
    Route::post('update_sport/{id}','SportsController@update');
    Route::post('delete_sport/{id}','SportsController@destroy');

    Route::get('teams', 'TeamsController@index');
    Route::get('edit_teams/{id}', 'TeamsController@edit');
    Route::post('add_team','TeamsController@store');
    Route::post('update_team/{id}','TeamsController@update');
    Route::post('delete_team/{id}','TeamsController@destroy');
});

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
