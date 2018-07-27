import React from "react";

export class LoginView extends React.Component {

    render() {
        return (
            <div class="container h-100 login-container">
  				<div class="row h-100 justify-content-center align-items-center">
				    <form className="form-signin col-4">
				      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
				      <label htmlFor="inputEmail" className="sr-only">Email address</label>
				      <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
				      <label htmlFor="inputPassword" className="sr-only">Password</label>
				      <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
				      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
				    </form>
		  		</div>
		  	</div>
        );
    }
}

export default LoginView
