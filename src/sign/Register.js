import React, { Component } from 'react';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import './Register.css';

class Register extends Component {
	render () {
		const isSignUp=this.props.isSignUp;
		if (isSignUp) {
		  return(
			<div className="register-main-content">
			  <div className="sign-up-box">
				<div className="sign-up-header"><h2> ثبت نام </h2></div>
				<div className="sign-up-form">
				<SignUp />
				</div>
			  </div>
			</div>
		  );
		}
		else {
		  return(
			<div className="register-main-content">
			  <div className="sign-in-box">
				<div className="sign-in-header"><h2> ورود </h2></div>
				<div className="sign-in-form">
				<SignIn />
				</div>
			  </div>
			</div>
		  );
		}
	}	
}

export default Register;
