import React, {Component} from 'react';
import './SignIn.css'
import ReactDOM from "react-dom";
import Sign from "../Sign";
import Home from "../../home/Home";
import axios from "axios";
import {Modal} from "react-bootstrap";
import {GoogleLogin, GoogleLogout} from 'react-google-login';

const CLIENT_ID = "964150934775-gp7lee33askr8laivsf0prbhgpb5lddu.apps.googleusercontent.com"

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.handleSignin = this.handleSignin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderHome = this.renderHome.bind(this);

        this.signIn = this.signIn.bind(this);

        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);

        this.state = {email: "", password: "", showModal: false, msg: "", isLogined: false, accessToken: ''}
    }


    handleSignup() {
        ReactDOM.render(
            <Sign isSignUp={true}/>,
            document.getElementById('root')
        );
    }

    renderHome() {
        ReactDOM.render(
            <Home/>,
            document.getElementById('root')
        );
    }

    handleSignin() {
        var format = /\S+@\S+\.\S+/;
        if (!format.test(this.state.email)) {//email
            console.log("email");
            this.setState({msg: "آدرس ایمیل وارد شده معتبر نیست."});
            this.handleShow();
            return;
        }
        console.log("sending login req");
        event.preventDefault();
        axios.put('http://185.166.105.6:30138/Loghmeh_war_exploded/sign_in', null,
            {params: {'email': this.state.email, 'password': this.state.password}}
        ).then((response) => {
            var authHeader = response.headers["authorization"].split(" ")[1]
            console.log(authHeader);
            localStorage.setItem("jwt_token", authHeader)
            this.renderHome();
        })
            .catch((error) => {
                console.log("error");
                if (error.response.status == 403) {
                    this.setState({msg: "ایمیل یا رمزعبور اشتباه است."});
                    this.handleShow();
                }
            });

    }


    handleEmailInput() {
        this.setState(prevState => ({email: event.target.value}));
    }

    handlePasswordInput() {
        this.setState(prevState => ({password: event.target.value}));
    }

    handleShow() {
        this.setState({showModal: true});
    }

    handleClose() {
        this.setState({showModal: false});
    }

    signIn(id_token) {
        console.log("id token: ", id_token);
        event.preventDefault();
        axios.put('http://185.166.105.6:30138/Loghmeh_war_exploded/google_sign_in', null,
            {
                params: {
                    'token': id_token
                }
            }
        ).then((response) => {
            console.log(response)
            var authHeader = response.headers["authorization"].split(" ")[1]
            console.log(authHeader);
            localStorage.setItem("jwt_token", authHeader)
            this.renderHome()
        })
            .catch((error) => {
                console.log("birin");
                if (error.response.status == 403) {
                    console.log("tuuuuu");
                    this.handleSignup();
                } else {
                    console.log(error);
                }
            })
    }

    login(response) {
        if (response.access_token) {
            this.setState(state => ({
                isLogined: true,
                accessToken: response.access_token
            }));
        }
        this.signIn(response.tokenId);
    }

    handleLoginFailure(response) {
        alert('Failed to log in')
    }


    render() {
        return (
            <div className="signin-container container-sm border">
                <form className="signin-form form-inline">
                    <input
                        type="email"
                        name="email"
                        className="sign-in-form form-control mb-2 mr-sm-2"
                        placeholder="ایمیل"
                        onChange={this.handleEmailInput}>
                    </input>
                    <input
                        type="password"
                        name="password"
                        className="sign-in-form form-control mb-2 mr-sm-2"
                        placeholder="رمز عبور"
                        onChange={this.handlePasswordInput}>
                    </input>
                    <div className="sub">
                        <input type="submit" value="ورود" className="signin-btn pull-center" onClick={this.handleSignin}></input>
                        <GoogleLogin
                            clientId={CLIENT_ID}
                            buttonText='Login'
                            onSuccess={this.login}
                            onFailure={this.handleLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            responseType='code,token'
                        />
                        <button className="signup-link" onClick={this.handleSignup} style={{cursor: 'pointer'}}>ثبت‌نام
                            نکرده‌اید؟
                        </button>
                    </div>
                </form>
                <Modal show={this.state.showModal} onHide={this.handleClose}><p id="error-msg">{this.state.msg}</p>
                </Modal>
            </div>
        );
    }
}

export default SignIn;