import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import * as ConstantsClass from '../Utilities/Constants.js';

export class Sport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sports: [],
            modalIsOpen: false,
            sport_name: '',
            msg: '',
            id: 0
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
        this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
    }

    openModal(sport) {
        this.setState({
            sports: [],
            modalIsOpen: true,
            sport_name: sport.sport_name,
            id: sport.id
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });

        this.props.history.push('/sports');
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
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

    handleEdit(event) {

        //Edit functionality
        event.preventDefault();

        var param = {
            sport_name: this.state.sport_name
        };

        var self = this;

        fetch(ConstantsClass.UPDATE_SPORT + this.state.id , {
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

    deleteSport(sport) {
        var data = {
            id: sport.id
        };

        var self = this;
        fetch(ConstantsClass.DELETE_SPORT + sport.id, {
            method: 'POST',
            headers: new Headers({
                'Authorization': window.sessionStorage.getItem('token'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                alert('Can\'t delete this sport due to related Teams/Athletes data');
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data);
            if (data.message === "success") {
                self.setState({msg: "Sport has been deleted."});
                self.componentDidMount();
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    render() {
        return (
            <div>
                <h3>Sports</h3>
                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Associated Athletes</th>
                            <th>Associated Teams</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.sports.map((item, key) =>
                            <tr key={item.id}>
                                <td>{item.sport_name} </td>
                                <td>{item.athletes.length > 0 ? item.athletes.map((subItem, j) => <span key={subItem.id} className="badge badge-success">{subItem.athlete_name}</span>) :
                                    <span className="badge badge-warning">none</span>} </td>
                                <td>{item.teams.length > 0 ? item.teams.map((subItem, j) => <span key={subItem.id} className="badge badge-success">{subItem.team_name}</span>) :
                                    <span className="badge badge-warning">none</span>} </td>
                                <td><a className="linkStyle" onClick={() => this.openModal(item)}>Edit</a>|<a className="linkStyle" onClick={() => this.deleteSport(item)}>Delete</a></td>
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
                            contentLabel="Edit Sport" >
                            <form onSubmit={this.handleEdit.bind(this)} method="POST" className="form-signin col-4">
                                <h4>Update Sport</h4>
                                <label>Sport Name</label>
                                <input onChange={this.logChange.bind(this)} className="form-control" value={this.state.sport_name} placeholder='Sport Name' name='sport_name' validations={['required']}/>
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

export default withRouter(Sport);