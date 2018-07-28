<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAthleteSportTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('athlete_sport', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('athlete_id')->unsigned()->index();
            $table->foreign('athlete_id')->references('id')->on('athletes')->onDelete('cascade');;
            $table->integer('sport_id')->unsigned()->index();
            $table->foreign('sport_id')->references('id')->on('sports')->onDelete('cascade');;
            $table->unique(array('athlete_id', 'sport_id'));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('athlete_sport');
    }
}
