<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['team_name', 'team_logo', 'sport_id'];

    // Associated Athletes who play for this Team
    public function athletes()
    {
        return $this->belongsToMany('App\Athlete');
    }

    // Sport played by this Team
    public function sport()
    {
        //return $this->hasOne('App\Sport', 'sport_id', 'sport_id');
        return $this->belongsTo('App\Sport');
    }
}
