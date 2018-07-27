<?php

namespace App\Http\Controllers;

use App\Athlete;
use Illuminate\Http\Request;

class AthletesController extends Controller
{
    // Returns all Athletes with their respective Sports and Teams
    public function index()
    {
        return Athlete::with('sports')->with('teams')->get();
    }

    // Returns associated Sport for the given Athlete
    public function getAssociatedSports($athleteId)
    {
        return Athlete::with('sports')->findOrFail($athleteId);
    }

    // Adds a Sport for Athlete
    public function addSportsForAthlete(Request $request)
    {
        $this->validate($request, [
            'athlete_id' => 'required',
            'sport_id' => 'required',
        ]);

        $athlete = Athlete::find($request['athlete_id']);
        $athlete->sports()->attach($request['sport_id']);

        return response()->json($athlete, 201);
    }

    // Adds a Team for Athlete
    public function addTeamsForAthlete(Request $request)
    {
        $this->validate($request, [
            'athlete_id' => 'required',
            'team_id' => 'required',
        ]);

        $athlete = Athlete::find($request['athlete_id']);
        $athlete->teams()->attach($request['team_id']);

        return response()->json($athlete, 201);
    }

    // Adds an Athlete into the database
    public function store(Request $request)
    {
        $this->validate($request, [
            'athlete_name' => 'required',
            'athlete_dob' => 'required|unique:athletes,athlete_dob',
            'athlete_age' => 'required',
            'athlete_height' => 'required',
            'athlete_body_weight' => 'required',
        ]);

        $request['athlete_dob'] = new \DateTime($request['athlete_dob']);
        $athlete = Athlete::create($request->all());
        return response()->json($athlete, 201);
    }
}
