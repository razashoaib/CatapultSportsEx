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
            'sport_id_array' => 'array',

        ]);

        // Array of Sport Ids
        $sportIds = $request['sport_id_array'];

        $athlete = Athlete::find($request['athlete_id']);
        $athlete->sports()->detach();
        $athlete->sports()->attach($sportIds);

        return response()->json($athlete, 201);
    }

    // Adds a Team for Athlete
    public function addTeamsForAthlete(Request $request)
    {
        $this->validate($request, [
            'athlete_id' => 'required',
            'team_id_array' => 'array',
        ]);

        // Array of Team Ids
        $teamIds = $request['team_id_array'];

        $athlete = Athlete::find($request['athlete_id']);
        $athlete->teams()->detach();
        $athlete->teams()->attach($teamIds);

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

    // Edit Athlete
    public function edit($id) {
        // Fetch and Pass Item
        $data = Athlete::with('sports')->with('teams')->findOrFail($id);
        return response()->json($data, 200);
    }

    // Update Athlete
    public function update(Request $request, $id) {

        // Validation
        $this->validate($request, [
            'athlete_name' => 'required',
            'athlete_dob' => 'required',
            'athlete_age' => 'required',
            'athlete_height' => 'required',
            'athlete_body_weight' => 'required'
        ]);

        // Find Record
        $data = Athlete::findOrFail($id);

        // Fetch Data
        $input = $request->all();

        // Exception Handling
        try {
            $input['updated_at'] = date("Y-m-d H:i:s");
            $input['athlete_dob'] = new \DateTime($request['athlete_dob']);

            // Update Instance
            $data->fill($input)->save();
        } catch (\Illuminate\Database\QueryException $ex) {

            abort($ex->getCode());
        }

        // Redirect Back
        return response()->json($data, 201);
    }

    // Delete Athlete
    public function destroy($id) {

        // Find Record
        $data = Athlete::findOrFail($id);

        // Exception Handling
        try {

            // Delete Instance
            $data->delete();

        } catch (\Illuminate\Database\QueryException $ex) {

            abort($ex->getCode());
        }

        // Redirect Back
        return response()->json(["message" => "success"], 201);
    }
}
