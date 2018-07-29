import React from "react";
import * as ConstantsClass from '../Utilities/Constants.js';


// This component is used for adding an Athlete and associating Teams and Sports for that Athlete
export class AddAthleteView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sports: [],
            teams: [],
            sport_id_array : [],
            team_id_array : [],
            athlete_name: '',
            athlete_dob: '',
            athlete_age: '',
            athlete_height: '',
            athlete_body_weight: '',
            msg: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let self = this;
        fetch(ConstantsClass.GET_ALL_SPORTS, {
            method: 'GET',
            headers: new Headers({
                'Authorization': window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            })
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({sports: data});

            fetch(ConstantsClass.GET_ALL_TEAMS, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': window.sessionStorage.getItem('token'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function(data) {
                self.setState({teams: data});
            }).catch(err => {
                this.props.history.push('/login');
                console.log('caught it!',err);
            })

        }).catch(err => {
            console.log('caught it!',err);
            this.props.history.push('/login');
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            athlete_name: this.state.athlete_name,
            athlete_dob: this.state.athlete_dob,
            athlete_age: this.state.athlete_age,
            athlete_height: this.state.athlete_height,
            athlete_body_weight: this.state.athlete_body_weight
        };
        var self = this;
        console.log(data);
        fetch(ConstantsClass.ADD_ATHLETE, {
            method: 'POST',
            headers: new Headers({
                'Authorization': window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        }).then(function(response) {
            console.log(response);
            if (response.status >= 400) {
                self.setState({msg: "Bad response from server"});
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)

            if(data){

                // Code to enter Sport and Athlete ids

                var athleteSportsData = {
                  'athlete_id' : data.id,
                  'sport_id_array': self.state.sport_id_array
                };
                fetch(ConstantsClass.ADD_ATHLETE_SPORTS, {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': window.sessionStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify(athleteSportsData)
                }).then(function(response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                }).then(function(data) {

                    // For Team ids
                    var athleteTeamsData = {
                        'athlete_id' : data.id,
                        'team_id_array': self.state.team_id_array
                    };
                    fetch(ConstantsClass.ADD_ATHLETE_TEAMS, {
                        method: 'POST',
                        headers: new Headers({
                            'Authorization': window.sessionStorage.getItem('token'),
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify(athleteTeamsData)
                    }).then(function(response) {
                        if (response.status >= 400) {
                            throw new Error("Bad response from server");
                        }
                        return response.json();
                    }).then(function(data) {
                        self.setState({msg: "Added Athlete successfully"});
                    }).catch(err => {
                        self.props.history.push('/login');
                        console.log('caught it!',err);
                    })
                    //...

                }).catch(err => {
                    self.props.history.push('/login');
                    console.log('caught it!',err);
                })

                //...

                // Code to add Sport Ids

                //..


            }
        }).catch(function(err) {
            console.log(err)
        });
    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    logChangeForMultiSelect(e) {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }

        this.setState({[e.target.name]: value});
    }

    render() {
        return (
            <div className="container h-100 register-container">
                {this.state.msg != "" && <Child msg={this.state.msg} />}

                <div className="row h-100 justify-content-center align-items-center">
                    <form onSubmit={this.handleSubmit.bind(this)} method="POST" className="form-signin col-4">
                        <h1 className="h3 mb-3 font-weight-normal">Add a new Athlete</h1>
                        <label htmlFor="inputName" className="sr-only">Athlete Name</label>
                        <input onChange={this.logChange.bind(this)} name="athlete_name" type="text" id="inputName" className="form-control" placeholder="Athlete Name" required autoFocus />
                        <label htmlFor="inputDob">Athlete DOB</label>
                        <input onChange={this.logChange.bind(this)} name="athlete_dob" type="date" id="inputDob" className="form-control" placeholder="Athlete Dob" required />
                        <label htmlFor="inputAge">Athlete Age</label>
                        <input onChange={this.logChange.bind(this)} name="athlete_age" type="number" min="0" max="100" id="inputAge" className="form-control" required />
                        <label htmlFor="inputHeight" >Athlete Height (CMs)</label>
                        <input onChange={this.logChange.bind(this)} name="athlete_height" type="number" step="any" min="0" max="350" id="inputHeight" className="form-control" required />
                        <label htmlFor="inputBodyWeight">Athlete Body Weight (KGs)</label>
                        <input onChange={this.logChange.bind(this)} name="athlete_body_weight" type="number" step="any" min="0" max="400" id="inputBodyWeight" className="form-control" required />

                        <label htmlFor="inputSport" >Associated Sports</label>
                        <select multiple="multiple" className="custom-select" id="inputSport" onChange={this.logChangeForMultiSelect.bind(this)} name="sport_id_array">
                            {this.state.sports.map((item, key) =>
                                <option key={key} value={item.id}>{item.sport_name}</option>
                            )}
                        </select>
                        <small id="logoHelp" className="form-text text-muted">Please add a sport first if its empty above.</small>

                        <label htmlFor="inputTeam" >Associated Teams</label>
                        <select multiple="multiple" className="custom-select" id="inputTeam" onChange={this.logChangeForMultiSelect.bind(this)} name="team_id_array">
                            {this.state.teams.map((item, key) =>
                                <option key={key} value={item.id}>{item.team_name}</option>
                            )}
                        </select>
                        <small id="logoHelp" className="form-text text-muted">Please add a team first if its empty above.</small>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Add</button>
                    </form>
                </div>
            </div>
        );
    }
}

const Child = (props) => (
    <div className="alert alert-success" role="alert">
        {props.msg}
    </div>
);

export default AddAthleteView
