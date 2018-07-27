import React from "react";
import * as ConstantsClass from '../Utilities/Constants.js';
import Team from '../CustomClasses/Team';

export class TeamView extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        let self = this;
        fetch(ConstantsClass.GET_ALL_TEAMS, {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({teams: data});
        }).catch(err => {

            console.log('caught it!',err);
            this.props.history.push('/login')
        })
    }

    render() {
        return (
            <div className="container">
                <Team teams={this.state.teams}/>
            </div>
        );
    }
}

export default TeamView