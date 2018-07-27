import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import * as ConstantsClass from '../Utilities/Constants.js';
import Athlete from '../CustomComponents/Athlete';
import Team from '../CustomComponents/Team';
import Sport from '../CustomComponents/Sport';

/* An example React component */
class Main extends Component {

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

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";
*/

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}