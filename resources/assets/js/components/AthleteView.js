import React from "react";
import Athlete from '../CustomClasses/Athlete';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

export class AthleteView extends React.Component {
    

    render() {
        return (
            <div className="container">
                <Link className="linkStyle" to={"/add_athlete"}>Add New Athlete</Link>
                <Athlete />
            </div>
        );
    }
}

export default withRouter(AthleteView)