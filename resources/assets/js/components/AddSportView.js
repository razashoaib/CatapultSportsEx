import React from "react";
import * as ConstantsClass from '../Utilities/Constants.js';

export class AddSportView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sport_name: '',
            msg: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            sport_name: this.state.sport_name
        };
        var self = this;
        console.log(data);
        fetch(ConstantsClass.ADD_SPORT, {
            method: 'POST',
            headers: new Headers({
                'Authorization': window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        }).then(function(response) {
            console.log(response);
            if (response.status >= 400) {
                self.setState({msg: "Bad response from server"});
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)

            if(data){
                self.setState({msg: "Added Sport successfully"});
            }
        }).catch(function(err) {
            console.log(err)
        });
    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="container h-100 register-container">
                {this.state.msg != "" && <Child msg={this.state.msg} />}

                <div className="row h-100 justify-content-center align-items-center">
                    <form onSubmit={this.handleSubmit.bind(this)} method="POST" className="form-signin col-4">
                        <h1 className="h3 mb-3 font-weight-normal">Add a new Sport</h1>
                        <label htmlFor="inputName" className="sr-only">Name</label>
                        <input onChange={this.logChange.bind(this)} name="sport_name" type="text" id="inputName" className="form-control" placeholder="Sport Name" required autoFocus />
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Add</button>
                    </form>
                </div>
            </div>
        );
    }
}

const Child = (props) => (
    <div className="alert alert-success" role="alert">
        {props.msg}
    </div>
);

export default AddSportView
