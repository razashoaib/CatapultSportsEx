import React from "react";
import * as ConstantsClass from '../Utilities/Constants.js';
import Athlete from '../CustomComponents/Athlete';

export class AthleteView extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            athletes: []
        }
    }

    componentDidMount() {
        let self = this;
        fetch(ConstantsClass.GET_ALL_ATHLETES, {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({athletes: data});
        }).catch(err => {
            console.log('caught it!',err);
        })
    }

    render() {
        return (
            <div className="container">
                <Athlete athletes={this.state.athletes}/>
            </div>
        );
    }
}

export default AthleteView