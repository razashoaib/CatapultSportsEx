import React from 'react';

function Sport(props) {
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
                    {props.sports.map((item, key) =>
                        <tr key={item.id}>
                            <td>{item.sport_name} </td>
                            <td>{ item.athletes.length > 0 ? item.athletes.map((subItem, j) => <span key={subItem.id} className="badge badge-success">{subItem.athlete_name}</span> ) : <span className="badge badge-warning">none</span>} </td>
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

export default Sport;