import React from "react";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Team from '../CustomClasses/Team';

export class TeamView extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                <Link className="linkStyle" to={"/add_team"}>Add New Team</Link>
                <Team/>
            </div>
        );
    }
}

export default withRouter(TeamView)