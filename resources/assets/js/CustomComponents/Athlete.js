import React from 'react';

function Athlete(props) {
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
                    {props.athletes.map((item, key) =>
                        <tr key={item.id}>
                            <td>{item.athlete_name} </td>
                            <td>{item.athlete_dob} </td>
                            <td>{item.athlete_height}cm </td>
                            <td>{item.athlete_body_weight}kg </td>
                            <td>{item.athlete_age} </td>
                            <td>{ item.sports.length > 0 ? item.sports.map((subItem, j) => <span key={subItem.id} className="badge badge-success">{subItem.sport_name}</span> ) : <span className="badge badge-warning">none</span>} </td>
                            <td>{ item.teams.length > 0 ? item.teams.map((subItem, j) => <span key={subItem.id} className="badge badge-success">{subItem.team_name}</span> ) : <span className="badge badge-warning">none</span>} </td>
                            <td><a>Edit</a>|<a>Delete</a></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Athlete;