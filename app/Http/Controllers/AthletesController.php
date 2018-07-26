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

    public function getAssociatedSports($athleteId)
    {
        return Athlete::with('sports')->findOrFail($athleteId);
    }

    public function addSportsForAthlete($athleteId, $sportId)
    {
        $athlete = Athlete::find($athleteId);
        $athlete->sports()->attach($sportId);

        return response()->json($athlete, 201);
    }

    // Adds an Athlete into the database
    public function store(Request $request)
    {
        $this->validate($request, [
            'athlete_name' => 'required',
            'athlete_dob' => 'required',
            'athlete_age' => 'required',
            'athlete_height' => 'required',
            'athlete_body_weight' => 'required',
        ]);

        $request['athlete_dob'] = new \DateTime($request['athlete_dob']);
        $athlete = Athlete::create($request->all());
        return response()->json($athlete, 201);
    }
}
