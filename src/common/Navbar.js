import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'react-bootstrap';
import LOGO from '../images/LOGO.png';
import Profile from '../profile/Profile';
import './Navbar.css';
import '../images/icons/flaticon.css';
import Cart from '../menu/cart/Cart';
import Home from '../home/Home';
import Sign from '../sign/Sign';

/* global gapi*/

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {logo : props.logo, account : props.account,
			cart : props.cart, quit : props.quit, showModal: false};
		this.cartElement = React.createRef();
		this.renderProfile = this.renderProfile.bind(this);
		this.renderHome = this.renderHome.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSignOut = this.handleSignOut.bind(this);
		this.renderSignIn = this.renderSignIn.bind(this);

	}

	handleShow() {
		this.setState({showModal: true});
	}

	handleClose() {
		this.setState({showModal: false});
	}

	renderProfile() {
		ReactDOM.render(
			<Profile tab={"credit"} />,
			document.getElementById('root')
		);
	}

	renderHome() {
		ReactDOM.render(
			<Home />,
			document.getElementById('root')
		);
	}

	renderSignIn() {
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

	handleSignOut() {
		localStorage.removeItem("jwt_token");
		this.renderSignIn();
	}

	render() {
		return (
			<nav className="navbar">
				<div className="container-fluid nav-container">
					<div className="row">
						<div className="right-navbar col-md-9">
							{this.state.logo &&
								<div className="loghmeh-logo" onClick={this.renderHome}>
									<img src={LOGO} alt="Loghmeh-Logo"></img>
								</div>
							}
						</div>
						<div className="left-navbar col-md-3">
							{this.state.cart &&
								<a className="flaticon-smart-cart" onClick={this.handleShow}></a>
							}
							<Modal show={this.state.showModal} onHide={this.handleClose}>
								<Cart />
							</Modal>
							{this.state.account &&
								<a className="profile" onClick={this.renderProfile}>حساب کاربری</a>
							}
							{this.state.quit &&
								<a className="quit-link" onClick={this.handleSignOut}>خروج</a>
							}
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar; // Don’t forget to use export default!
