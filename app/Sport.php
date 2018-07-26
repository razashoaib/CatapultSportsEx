<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sport extends Model
{
    protected $fillable = ['sport_name'];

    // Athletes who play this Sport
    public function athletes()
    {
        return $this->belongsToMany('App\Athlete');
    }

    // Associated Team with this Sport
    public function team()
    {
        return $this->belongsTo('App\Team');
    }
}
