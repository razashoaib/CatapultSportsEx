import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AthleteView from './AthleteView'
import SportView from './SportView'
import AddSportView from './AddSportView'
import TeamView from './TeamView'
import AddTeamView from './AddTeamView'
import LoginView from './LoginView'
import RegisterView from './RegisterView'
import AddAthleteView from "./AddAthleteView";

// The Main component renders one of the following provided
// Routes (provided that one matches). The / route will only match
// when the pathname is exactly the string "/"

const MasterView = () => (
  <main>
    <Switch>
      <Route exact path='/' component={AthleteView}/>
      <Route path='/athletes' component={AthleteView}/>
      <Route path='/add_athlete' component={AddAthleteView}/>
      <Route path='/sports' component={SportView}/>
      <Route path='/add_sport' component={AddSportView}/>
      <Route path='/teams' component={TeamView}/>
      <Route path='/add_team' component={AddTeamView}/>
      <Route path='/login' component={LoginView}/>
      <Route path='/register' component={RegisterView}/>
    </Switch>
  </main>
)

export default MasterView
