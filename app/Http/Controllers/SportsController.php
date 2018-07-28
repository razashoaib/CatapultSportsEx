<?php

namespace App\Http\Controllers;

use App\Sport;
use Illuminate\Http\Request;

class SportsController extends Controller
{
    // Returns all Sports with their respective Athletes and Teams
    public function index()
    {
        return Sport::with('athletes')->with('teams')->get();
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

    // Edit Sport
    public function edit($id) {
        // Fetch and Pass Item
        $data = Sport::findOrFail($id);
        return response()->json($data, 200);
    }

    // Update Sport
    public function update(Request $request, $id) {

        // Validation
        $this->validate($request, [
            'sport_name'
        ]);

        // Find Record
        $data = Sport::findOrFail($id);

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

    // Delete Sport
    public function destroy($id) {

        // Find Record
        $data = Sport::findOrFail($id);

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
