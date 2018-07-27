import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AthleteView from './AthleteView'
import SportView from './SportView'
import TeamView from './TeamView'
import LoginView from './LoginView'
import RegisterView from './RegisterView'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const MasterView = () => (
  <main>
    <Switch>
      <Route exact path='/' component={AthleteView}/>
      <Route path='/athletes' component={AthleteView}/>
      <Route path='/sports' component={SportView}/>
      <Route path='/teams' component={TeamView}/>
      <Route path='/login' component={LoginView}/>
      <Route path='/register' component={RegisterView}/>
    </Switch>
  </main>
)

export default MasterView