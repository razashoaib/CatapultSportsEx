import React from "react";
import { Link } from 'react-router-dom';
import Sport from '../CustomClasses/Sport';
import { withRouter } from 'react-router-dom';

export class SportView extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                <Link className="linkStyle" to={"/add_sport"}>Add New Sport</Link>
                <Sport/>
            </div>
        );
    }
}

export default withRouter(SportView);