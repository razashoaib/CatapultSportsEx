import React from "react";
import * as ConstantsClass from "../Utilities/Constants";
import * as Configuration from "../Utilities/Configuration";

export class LoginView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            msg: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state.session = window.sessionStorage;
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            email: this.state.email,
            password: this.state.password
        };
        var self = this;
        console.log(data);
        fetch(ConstantsClass.LOGIN_USER, {
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
                window.sessionStorage.setItem("token", "Bearer " + data.success.token);
                self.setState({msg: "Logged In"});
                self.props.history.push('/');
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
            <div className="container h-100 login-container">
                {window.sessionStorage.getItem('token') != null && <MessagePanel />}

                <div className="row h-100 justify-content-center align-items-center">
                    <form onSubmit={this.handleSubmit.bind(this)} className="form-signin col-4">
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input onChange={this.logChange.bind(this)} type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" onChange={this.logChange.bind(this)} name="password" id="inputPassword" className="form-control" placeholder="Password" required />
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    </form>
                </div>
		  	</div>
        );
    }
}

const MessagePanel = () => (
    <div className="alert alert-success" role="alert">
        <strong>You are already logged in!</strong>
    </div>
);

export default LoginView
