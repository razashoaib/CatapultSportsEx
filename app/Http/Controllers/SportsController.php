<?php

namespace App\Http\Controllers;

use App\Sport;
use Illuminate\Http\Request;

class SportsController extends Controller
{
    // Returns all Sports with their respective Athletes and Teams
    public function index()
    {
        return Sport::with('athletes')->with('team')->get();
    }

    // Adds a Sport into the database
    public function store(Request $request)
    {
        $this->validate($request, [
            'sport_name' => 'required|unique:sports,sport_name'
        ]);

        $sport = Sport::create($request->all());
        return response()->json($sport, 201);
    }
}
