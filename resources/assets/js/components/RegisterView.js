import React from "react";

export class RegisterView extends React.Component {

    render() {
        return (
            <div class="container h-100 register-container">
  				<div class="row h-100 justify-content-center align-items-center">
				    <form className="form-signin col-4">
				      <h1 className="h3 mb-3 font-weight-normal">Register a new user</h1>
				      <label htmlFor="inputName" className="sr-only">Name</label>
				      <input type="text" id="inputName" className="form-control" placeholder="Name" required autoFocus />
				      <label htmlFor="inputEmail" className="sr-only">Email address</label>
				      <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
				      <label htmlFor="inputPassword" className="sr-only">Password</label>
				      <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
				      
				      <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
				    </form>
		  		</div>
		  	</div>
        );
    }
}

export default RegisterView
