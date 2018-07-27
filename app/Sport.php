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

    // Associated Teams with this Sport
    public function teams()
    {
        return $this->hasMany('App\Team');
    }
}
