import React, { Component } from 'react';
import axios from 'axios';

import './SignUp.css'
import {Modal} from "react-bootstrap";
import ReactDOM from "react-dom";
import Home from "../../home/Home";

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
		this.handleLastNameInput = this.handleLastNameInput.bind(this);
		this.handlePhoneNumberInput = this.handlePhoneNumberInput.bind(this);
		this.handleEmailInput = this.handleEmailInput.bind(this);
		this.handlePasswordInput = this.handlePasswordInput.bind(this);

		this.validateInputs = this.validateInputs.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		this.renderHome = this.renderHome.bind(this);

        this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {firstname : "", lastname : "", phone_number : "", email : "", password : ""
			, showModal : false, msg : ""};
	}

	handleFirstNameInput() {
		this.setState(prevState => ({firstname : event.target.value}));
	}

	handleLastNameInput() {
		this.setState(prevState => ({lastname : event.target.value}));
	}

	handlePhoneNumberInput() {
		this.setState(prevState => ({phone_number : event.target.value}));
	}

	handleEmailInput() {
		this.setState(prevState => ({email : event.target.value}));
	}

	handlePasswordInput() {
		this.setState(prevState => ({password : event.target.value}));
	}

	validateInputs() {
		console.log("validate");
		var format = /\S+@\S+\.\S+/;
		if(!format.test(this.state.email)){//email
			console.log("email");
			this.setState({msg:"آدرس ایمیل وارد شده معتبر نیست."});
			this.handleShow();
			return false;
		}
		if(this.state.phone_number.length != 11){//phonenumber
			console.log("phonenumber");
			this.setState({msg:"شماره تلفن وارد شده معتبر نیست."});
			this.handleShow();
			return false;
		}
		if(this.state.password.length < 5){
			console.log("password1");
			this.setState({msg:"رمز عبور وارد شده کوتاه است."});
			this.handleShow();
			return false;
		}
		if(!this.state.password.match('^(?=.*[0-9]$)(?=.*[a-zA-Z])')){
			console.log("password2", this.state.password, "sal");
			this.setState({msg:"رمز عبور وارد شده باید حاوی حروف و عدد باشد."});
			this.handleShow();
			return false;
		}
		return true;
	}

	handleRegister() {
		event.preventDefault();
		if( this.validateInputs()) {
			console.log("sending registration req");
			axios.put('http://185.166.105.6:30138/Loghmeh/sign_up', null,
			{params: {'firstname' : this.state.firstname, 'lastname' : this.state.lastname, 
					  'phone_number' : this.state.phone_number, 'email' : this.state.email,
					  'password' : this.state.password}}
			).then( (response) => {
				console.log(response.headers["authorization"].split(" ")[1]);
				localStorage.setItem("jwt_token", response.headers["authorization"].split(" ")[1])
				this.renderHome();
			})
			.catch((error) => {
				if (error.response.status == 400){
					this.setState({msg:"آدرس ایمیل تکراری است."});
					this.handleShow();
				}
			});
		}
	}

	renderHome() {
		ReactDOM.render(
			<Home />,
			document.getElementById('root')
		);
	}

	handleShow() {
		this.setState({showModal: true});
	}

	handleClose() {
		this.setState({showModal: false});
	}

	render() {
		return (
		<div className="signup-container container-sm border">
			<form className="signup-form form-inline" onSubmit={this.handleRegister}>
				<input
					type="text" name="firstname"
					className="sign-up-form form-control mb-2 mr-sm-2"
					placeholder="نام" onChange={this.handleFirstNameInput}>
				</input>
				<input
					type="text"
					name="lastname"
					className="sign-up-form form-control mb-2 mr-sm-2"
					placeholder="نام خانوادگی" onChange={this.handleLastNameInput}>
				</input>
				<input
					type="text"
					name="phone-number"
					className="sign-up-form form-control mb-2 mr-sm-2"
					placeholder="تلفن همراه" onChange={this.handlePhoneNumberInput}>
				</input>
				<input
					type="email"
					name="email"
					className="sign-up-form form-control mb-2 mr-sm-2"
					placeholder="ایمیل" onChange={this.handleEmailInput}>
				</input>
				<input
					type="password"
					name="password"
					className="sign-up-form form-control mb-2 mr-sm-2"
					placeholder="رمز عبور" onChange={this.handlePasswordInput}>
				</input>
				<input type="submit" value="ثبت نام" className="signup-btn pull-center"></input>
			</form>
			<Modal show={this.state.showModal} onHide={this.handleClose} ><p id="error-msg">{this.state.msg}</p></Modal>
		</div>
		);
	}
}

  export default SignUp;