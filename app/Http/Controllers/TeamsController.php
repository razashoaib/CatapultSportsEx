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
}
