import React from "react";
import * as ConstantsClass from '../Utilities/Constants.js';
import Sport from '../CustomClasses/Sport';

export class SportView extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            sports: []
        }
    }

    componentDidMount() {
        let self = this;
        fetch(ConstantsClass.GET_ALL_SPORTS, {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({sports: data});
        }).catch(err => {
            console.log('caught it!',err);
        })
    }

    render() {
        return (
            <div className="container">
                <Sport sports={this.state.sports}/>
            </div>
        );
    }
}

export default SportView