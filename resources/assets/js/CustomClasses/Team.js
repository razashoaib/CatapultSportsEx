import React from 'react';

function Team(props) {
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
                    {props.teams.map((item,i) =>
                        <tr key={item.id}>
                            <td> <img width="20px" height="20px" src={item.team_logo} /> </td>
                            <td>{item.team_name}</td>
                            <td>{ item.sport.sport_name} </td>
                            <td>{ item.athletes.length > 0 ? item.athletes.map((subItem, j) => <span key={subItem.id} className="badge badge-success">{subItem.athlete_name}</span> ) : <span className="badge badge-warning">none</span>} </td>



                            <td><a>Edit</a>|<a>Delete</a></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Team;