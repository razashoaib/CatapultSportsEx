import React from 'react';
import Modal from 'react-modal';
import * as ConstantsClass from '../Utilities/Constants.js';
import { withRouter } from 'react-router-dom';


//This class consists the functionlity to edit, delete and show Athletes.

export class Athlete extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            athletes: [],
            athlete_sports: [],
            athlete_teams: [],
            sports: [],
            teams: [],
            sport_id_array : [],
            team_id_array : [],
            athlete_name: '',
            athlete_dob: '',
            athlete_age: '',
            athlete_height: '',
            athlete_body_weight: '',
            msg: '',
            id: 0

        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
        this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
    }

    openModal(athlete) {
            this.setState({
                athletes: [],
                modalIsOpen: true,
                athlete_sports: athlete.sports,
                athlete_teams: athlete.teams,
                athlete_name: athlete.athlete_name,
                athlete_dob: athlete.athlete_dob,
                athlete_age: athlete.athlete_age,
                athlete_height: athlete.athlete_height,
                athlete_body_weight: athlete.athlete_body_weight,
                id: athlete.id
            });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });

        this.props.history.push('/athletes');
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
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

    componentDidMount() {
        let self = this;
        fetch(ConstantsClass.GET_ALL_ATHLETES, {
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
            self.getAllTeams(self);
            self.setState({athletes: data});
        }).catch(err => {
            this.props.history.push('/login');
            console.log('caught it!',err);
        })
    }

    getAllSelectedTeams(teamObj) {
        var teamsId = [];
        teamObj.map((item, key) => teamsId.push(item.id));
        return teamsId;
    }

    getAllSelectedSports(sportObj) {
        var sportsId = [];
        sportObj.map((item, key) => sportsId.push(item.id));
        return sportsId;
    }

    getAllTeams(context) {
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
            context.getAllSports(context);
            context.setState({teams: data});
        }).catch(err => {
            context.history.push('/login');
            console.log('caught it!',err);
        })
    }

    getAllSports(context) {
        fetch(ConstantsClass.GET_ALL_SPORTS, {
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
            context.setState({sports: data});
        }).catch(err => {
            context.history.push('/login');
            console.log('caught it!',err);
        })
    }



    handleEdit(event) {

        //Edit functionality
        event.preventDefault();

        var param = {
            athlete_name: this.state.athlete_name,
            athlete_dob: this.state.athlete_dob,
            athlete_age: this.state.athlete_age,
            athlete_height: this.state.athlete_height,
            athlete_body_weight: this.state.athlete_body_weight
        };

        var self = this;

        fetch(ConstantsClass.UPDATE_ATHLETE + this.state.id , {
            method: 'POST',
            headers: new Headers({
                'Authorization': window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(param)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data);
            self.closeModal();
            if (data) {


                // Code to add Sports And Teams For Athlete

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
                        self.setState({
                            msg: "Data has been edited."
                        });
                        self.componentDidMount();
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
            }
        }).catch(function(err) {
            console.log(err)
        });
    }

     deleteAthlete(athlete){
        var self = this;
        var data = {
            id: athlete.id
        };
        fetch(ConstantsClass.DELETE_ATHLETE + athlete.id , {
            method: 'POST',
            headers: new Headers({
                 'Authorization': window.sessionStorage.getItem('token'),
                 'Content-Type': 'application/x-www-form-urlencoded'
             }),
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if (data.message === "success") {
                self.setState({msg: "Athlete has been deleted."});
                self.componentDidMount();
            }
        }).catch(function(err) {
            console.log(err)
        });
    }

     render() {
        return (
            <div>
                <h3>Athletes</h3>
                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Age</th>
                            <th>Associated Sports</th>
                            <th>Associated Teams</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.athletes.map((item, key) =>
                            <tr key={item.id}>
                                <td>{item.athlete_name} </td>
                                <td>{item.athlete_dob} </td>
                                <td>{item.athlete_height}cm </td>
                                <td>{item.athlete_body_weight}kg </td>
                                <td>{item.athlete_age} </td>
                                <td>{ item.sports.length > 0 ? item.sports.map((subItem, j) => <span key={subItem.id} className="badge badge-success">{subItem.sport_name}</span> ) : <span className="badge badge-warning">none</span>} </td>
                                <td>{ item.teams.length > 0 ? item.teams.map((subItem, j) => <span key={subItem.id} className="badge badge-success">{subItem.team_name}</span> ) : <span className="badge badge-warning">none</span>} </td>
                                <td><a className="linkStyle" onClick={() => this.openModal(item)} >Edit</a>|<a className="linkStyle" onClick={() => this.deleteAthlete(item)}>Delete</a></td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    {/* Modal to edit the data */}

                    <Modal

                        style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        ariaHideApp={false}
                        contentLabel="Edit Athlete" >
                        <form onSubmit={this.handleEdit.bind(this)} method="POST" className="form-signin col-4">
                            <label className="modal-heading">Update Athlete</label><br/>

                            <label>Athlete Name</label>
                            <input onChange={this.logChange.bind(this)} name="athlete_name" type="text" value={this.state.athlete_name} id="inputName" className="form-control" placeholder="Athlete Name" validations={['required']} autoFocus />

                            <label htmlFor="inputDob">Athlete DOB</label>
                            <input onChange={this.logChange.bind(this)} name="athlete_dob" type="date" value={this.state.athlete_dob} id="inputDob" className="form-control" placeholder="Athlete Dob" validations={['required']} />

                            <label htmlFor="inputAge">Athlete Age</label>
                            <input onChange={this.logChange.bind(this)} name="athlete_age" type="number" value={this.state.athlete_age} min="0" max="100" id="inputAge" className="form-control" validations={['required']} />

                            <label htmlFor="inputHeight" >Athlete Height (CMs)</label>
                            <input onChange={this.logChange.bind(this)} name="athlete_height" type="number" value={this.state.athlete_height} step="any" min="0" max="350" id="inputHeight" className="form-control" validations={['required']} />

                            <label htmlFor="inputBodyWeight">Athlete Body Weight (KGs)</label>
                            <input onChange={this.logChange.bind(this)} name="athlete_body_weight" type="number" value={this.state.athlete_body_weight} step="any" min="0" max="400" id="inputBodyWeight" className="form-control" validations={['required']} />

                            <label htmlFor="inputSport" >Associated Sports</label><br/>
                            { this.state.athlete_sports.length > 0 ? this.state.athlete_sports.map((subItem, j) => <span key={subItem.id} className="badge badge-success">{subItem.sport_name}</span> ) : <span className="badge badge-warning">none</span>}<br/>

                            <label htmlFor="inputTeam" >Associated Teams</label><br/>
                            { this.state.athlete_teams.length > 0 ? this.state.athlete_teams.map((subItem, j) => <span key={subItem.id} className="badge badge-success">{subItem.team_name}</span> ) : <span className="badge badge-warning">none</span>}<br/>

                            <label htmlFor="inputSport" >All Sports</label>
                            <select multiple="multiple" className="custom-select" id="inputSport" onChange={this.logChangeForMultiSelect.bind(this)} name="sport_id_array">
                                {this.state.sports.map((item, key) =>
                                    <option key={key} value={item.id}>{item.sport_name}</option>
                                )}
                            </select>
                            <small id="logoHelp" className="form-text text-muted">Update the associated Sports for this Athlete from above.</small>

                            <label htmlFor="inputTeam" >All Teams</label>
                            <select multiple="multiple" className="custom-select" id="inputTeam" onChange={this.logChangeForMultiSelect.bind(this)} name="team_id_array">
                                {this.state.teams.map((item, key) =>
                                    <option key={key} value={item.id}>{item.team_name}</option>
                                )}
                            </select>
                            <small id="logoHelp" className="form-text text-muted">Update the associated Teams for this Athlete from above.</small>

                            <div className="submit-section">
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Update</button>
                            </div>
                        </form>
                    </Modal>

                </div>
            </div>
        );
    }
}

export default withRouter(Athlete);