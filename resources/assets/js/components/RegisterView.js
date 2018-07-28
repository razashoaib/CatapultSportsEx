import React from "react";
import * as ConstantsClass from '../Utilities/Constants.js';

export class RegisterView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
			password: '',
            msg: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            c_password: this.state.password
        };
        var self = this;
        console.log(data);
        fetch(ConstantsClass.REGISTER_USER, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)

            if(data.success){
                self.setState({msg: "Thanks for registering"});
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
                {this.state.msg != "" && <Child />}

  				<div className="row h-100 justify-content-center align-items-center">
				    <form onSubmit={this.handleSubmit.bind(this)} method="POST" className="form-signin col-4">
				      <h1 className="h3 mb-3 font-weight-normal">Register a new user</h1>
				      <label htmlFor="inputName" className="sr-only">Name</label>
				      <input onChange={this.logChange.bind(this)} name="name" type="text" id="inputName" className="form-control" placeholder="Name" required autoFocus />
				      <label htmlFor="inputEmail" className="sr-only">Email address</label>
				      <input onChange={this.logChange.bind(this)} name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
				      <label htmlFor="inputPassword" className="sr-only">Password</label>
				      <input onChange={this.logChange.bind(this)} name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />
				      
				      <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
				    </form>
		  		</div>
		  	</div>
        );
    }
}

const Child = () => (
    <div className="alert alert-success" role="alert">
        <strong>Well done!</strong> You have successfully registered.
    </div>
);

export default RegisterView
