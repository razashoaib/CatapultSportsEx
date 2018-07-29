import React from "react";
import * as ConstantsClass from '../Utilities/Constants.js';

// This component is used for adding a Team and associating a Sport for that Team.

export class AddTeamView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sports: [],
            team_name: '',
            team_logo: '',
            sport_id: 0,
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
        }).catch(err => {
            console.log('caught it!',err);
            this.props.history.push('/login');
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            team_name: this.state.team_name,
            team_logo: this.state.team_logo,
            sport_id: this.state.sport_id
        };
        var self = this;
        console.log(data);
        fetch(ConstantsClass.ADD_TEAM, {
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
                self.setState({msg: "Added Sport successfully"});
            }
        }).catch(function(err) {
            console.log(err)
        });
    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="container h-100 register-container">
                {this.state.msg != "" && <Child msg={this.state.msg} />}

                <div className="row h-100 justify-content-center align-items-center">
                    <form onSubmit={this.handleSubmit.bind(this)} method="POST" className="form-signin col-4">
                        <h1 className="h3 mb-3 font-weight-normal">Add a new Team</h1>
                        <label htmlFor="inputName" className="sr-only">Team Name</label>
                        <input onChange={this.logChange.bind(this)} name="team_name" type="text" id="inputName" className="form-control" placeholder="Team Name" required autoFocus />
                        <label htmlFor="inputLogo" className="sr-only">Team Logo</label>
                        <input onChange={this.logChange.bind(this)} name="team_logo" type="text" id="inputLogo" className="form-control" placeholder="Team Logo" required autoFocus />
                        <small id="logoHelp" className="form-text text-muted">Please add an absoulte URL above.</small>
                        <label htmlFor="inputSport" className="sr-only">Associated Sport</label>
                        <select className="custom-select" id="inputSport" onChange={this.logChange.bind(this)} name="sport_id">
                            <option selected>Select Sport</option>
                            {this.state.sports.map((item, key) =>
                                <option key={key} value={item.id}>{item.sport_name}</option>
                            )}
                        </select>
                        <small id="logoHelp" className="form-text text-muted">Please add a sport first if its empty above.</small>
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

export default AddTeamView
