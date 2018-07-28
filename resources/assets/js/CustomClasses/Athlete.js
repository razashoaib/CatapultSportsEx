import React from 'react';
import * as ConstantsClass from '../Utilities/Constants.js';

export class Athlete extends React.Component {

    constructor(props) {
            super(props)
            this.state = {
                athletes: []
            }
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
            self.setState({athletes: data});
        }).catch(err => {
            this.props.history.push('/login');
            console.log('caught it!',err);
        })
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

     render(props) {
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
                                <td><a className="linkStyle">Edit</a>|<a className="linkStyle" onClick={() => this.deleteAthlete(item)}>Delete</a></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Athlete;