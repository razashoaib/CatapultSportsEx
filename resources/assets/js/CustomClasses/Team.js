import React from 'react';
import { withRouter } from 'react-router-dom';
import * as ConstantsClass from '../Utilities/Constants.js';
import Modal from 'react-modal';

//This class consists the functionality to edit, delete and show Teams.

export class Team extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            teams: [],
            sports: [],
            msg: '',
            modalIsOpen: false,
            team_name: '',
            team_logo: '',
            sport_id: '',
            msg: '',
            id: 0
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
        this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
    }

    openModal(team) {
        this.setState({
            teams: [],
            modalIsOpen: true,
            id: team.id,
            team_name: team.team_name,
            team_logo: team.team_logo,
            sport_id: team.sport.id,
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    componentDidMount() {
        let self = this;

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
                console.log(self.state.sports);
            }).catch(err => {
                console.log('caught it!',err);
                self.props.history.push('/login');
            });

            self.setState({teams: data});
        }).catch(err => {
            this.props.history.push('/login');
            console.log('caught it!',err);
        })

    }

    handleEdit(event) {

        //Edit functionality
        event.preventDefault();

        var param = {
            team_name: this.state.team_name,
            team_logo: this.state.team_logo,
            sport_id: this.state.sport_id
        };

        var self = this;

        fetch(ConstantsClass.UPDATE_TEAM + this.state.id , {
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
                self.setState({
                    msg: "Data has been edited."
                });
                self.componentDidMount();
            }
        }).catch(function(err) {
            console.log(err)
        });
    }

    deleteTeam(team) {
        var data = {
            id: team.id
        };
        var self = this;

        fetch(ConstantsClass.DELETE_TEAM + team.id, {
            method: 'POST',
            headers: new Headers({
                'Authorization': window.sessionStorage.getItem('token'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            if (data.message === "success") {
                self.setState({msg: "Sport has been deleted."});
                self.componentDidMount();
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    componentWillMount() {
        var self = this;
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
            self.props.history.push('/login');
        })
    }


    render() {
        return (
            <div>
                <h3>Teams</h3>
                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Name</th>
                            <th>Associated Sport</th>
                            <th>Associated Athletes</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.teams.map((item, i) =>
                            <tr key={item.id}>
                                <td><img width="20px" height="20px" src={item.team_logo}/></td>
                                <td>{item.team_name}</td>
                                <td>{item.sport.sport_name} </td>
                                <td>{item.athletes.length > 0 ? item.athletes.map((subItem, j) => <span key={subItem.id} className="badge badge-success">{subItem.athlete_name}</span>) :
                                    <span className="badge badge-warning">none</span>} </td>
                                <td><a onClick={() => this.openModal(item)} className="linkStyle">Edit</a>|<a className="linkStyle" onClick={() => this.deleteTeam(item)}>Delete</a>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    {/* Modal to edit the data */}

                    <Modal
                        className="row h-100 justify-content-center align-items-center"
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        ariaHideApp={false}
                        contentLabel="Edit Team" >
                        <form onSubmit={this.handleEdit.bind(this)} method="POST" className="form-signin col-4">
                            <h4>Update Team</h4>
                            <label>Team Name</label>
                            <input onChange={this.logChange.bind(this)} className="form-control" value={this.state.team_name} placeholder='Team Name' name='team_name' validations={['required']}/>
                            <label>Team Logo</label>
                            <input onChange={this.logChange.bind(this)} className="form-control" value={this.state.team_logo} placeholder='Team Logo' name='team_logo' validations={['required']}/>
                            <small id="logoHelp" className="form-text text-muted">Please add an absoulte URL above.</small>
                            <label>Associated Sport</label>
                            <select className="custom-select" id="inputSport" value={this.state.sport_id} onChange={this.logChange.bind(this)} name="sport_id">
                                <option selected>Select Sport</option>
                                {this.state.sports.map((item, key) =>
                                    <option key={key} value={item.id}>{item.sport_name}</option>
                                )}
                            </select>
                            <small id="logoHelp" className="form-text text-muted">Please add a sport first if its empty above.</small>
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
export default withRouter(Team);
