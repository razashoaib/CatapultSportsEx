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
                    {props.sports.map(obj =>
                        <tr key={obj.id}>
                            <td>{obj.sport_name} </td>
                            <td>{ obj.teams.length > 0 ? obj.teams[0].team_name : 'none'} </td>
                            <td>{ obj.athletes.length > 0 ? obj.athletes[0].athlete_name : 'none'} </td>
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