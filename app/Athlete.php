<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Athlete extends Model
{
    protected $fillable = ['athlete_name', 'athlete_dob', 'athlete_age', 'athlete_height', 'athlete_body_weight'];

    // Teams this Athlete plays for
    public function teams()
    {
        return $this->belongsToMany('App\Team');
    }

    // Sports played by this Athlete
    public function sports()
    {
        return $this->belongsToMany('App\Sport');
    }
}
