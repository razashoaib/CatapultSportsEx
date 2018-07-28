<?php

namespace App\Http\Controllers;

use App\Team;
use Illuminate\Http\Request;

class TeamsController extends Controller
{
    // Returns all Teams with their respective Athletes and Sport
    public function index()
    {
        return Team::with('athletes')->with('sport')->get();
    }

    // Adds a Team into the database with it's associated Sport
    public function store(Request $request)
    {
        $this->validate($request, [
            'team_name' => 'required|unique:teams,team_name',
            'team_logo' => 'required',
            'sport_id' => 'required'
        ]);

        $team = Team::create($request->all());
        return response()->json($team, 201);
    }

    // Edit Team
    public function edit($id) {
        // Fetch and Pass Item
        $data = Team::with('sport')->findOrFail($id);
        return response()->json($data, 200);
    }

    // Update Team
    public function update(Request $request, $id) {

        // Validation
        $this->validate($request, [
            'team_name',
            'team_logo',
            'sport_id'
        ]);

        // Find Record
        $data = Team::findOrFail($id);

        // Fetch Data
        $input = $request->all();

        // Exception Handling
        try {
            $input['updated_at'] = date("Y-m-d H:i:s");

            // Update Instance
            $data->fill($input)->save();
        } catch (\Illuminate\Database\QueryException $ex) {

            abort($ex->getCode());
        }

        // Redirect Back
        return response()->json($data, 201);
    }

    // Delete Team
    public function destroy($id) {

        // Find Record
        $data = Team::findOrFail($id);

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
