import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import {Modal} from 'react-bootstrap';
import Navbar from '../common/Navbar';
import UserInfo from './UserInfo';
import Credit from './credit/Credit';
import Orders from './orders/Orders';
import Footer from '../common/Footer';
import './Profile.css'
import Sign from "../sign/Sign";


class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {tab : props.tab, showModal : false, errorMsg : ""};
		this.userInfoElement = React.createRef();
		this.handleCreditIncrease = this.handleCreditIncrease.bind(this);

		this.renderSignin = this.renderSignin.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	render() {
		return(
			<div className="profile">
				<Navbar logo={true} cart={true} account={false} quit={true}/>
				<UserInfo ref={this.userInfoElement} />
				<div className="profile-main-content">
					<div className="tab-box">
						<div className="btn-group btn-group-lg">
							<button type="button" id="credit" className="tab btn btn-primary z-depth-1" onClick={this.changeTab.bind(this, "credit")}>
								<a id="credit-link"> افزایش اعتبار </a>
							</button>
							<button type="button" id="orders" className="tab btn btn-primary z-depth-1" onClick={this.changeTab.bind(this, "orders")}>
								<a id="orders-link">سفارش‌ها</a>
							</button>
						</div>
						{this.state.tab == "credit" ? <Credit onClick={this.handleCreditIncrease}/> : <Orders />}
					</div>
				</div>
				<Modal show={this.state.showModal} onHide={this.handleClose} ><p id="error-msg">{this.state.msg}</p></Modal>
				<Footer />
			</div>
		);
	}

	changeStyle(newTab, prevTab) {
		console.log(newTab, prevTab, "hello");
		document.getElementById(newTab).style.background="#FF6B6B";
		document.getElementById(newTab+"-link").style.color="white";
		document.getElementById(prevTab).style.background="white";
		document.getElementById(prevTab+"-link").style.color="black";
	}

	changeTab(newTab) {
		this.setState((prevState, props) => ({tab : newTab}));
		let prevTab;
		if(newTab == "credit")
			prevTab = "orders";
		else if(newTab == "orders")
			prevTab = "credit";
		this.changeStyle(newTab, prevTab);
	}

	handleCreditIncrease(credit) {
		event.preventDefault();
		console.log("credit", credit);
		if(credit <= 0){
			this.setState({msg:"مقدار وارد شده معتبر نیست."});
			this.handleShow();
		}
		else{
			event.preventDefault();
			axios.put('http://185.166.105.6:30138/Loghmeh/credit', null,
				{	params: {'creditIncrease': credit},
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
					}}
			).then( (response) => {this.userInfoElement.current.updateUserInfo();})
				.catch((error) => {
					if(error.response.status == 401 || error.response.status == 403){
						this.renderSignin();
					}
				});
		}
	}

	renderSignin() {
		ReactDOM.render(
			<Sign isSignUp={false}/>,
			document.getElementById('root')
		);
	}

	handleShow() {
		this.setState({showModal: true});
	}

	handleClose() {
		this.setState({showModal: false});
	}

}

export default Profile;