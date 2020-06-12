import React, {Component} from 'react';
import Home from './home/Home';
import Sign from './sign/Sign'
import './App.css';
import axios from "axios";


class App extends Component {
    constructor(props) {
        super(props);
        this.tokenValidation = this.tokenValidation.bind(this);
        this.state = {isTokenValid: false};
    }


    tokenValidation() {

        console.log("token validation is called");
        if (localStorage.getItem("jwt_token") == null)
            return;
        axios.get("http://185.166.105.6:32112/Loghmeh/token_validation", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
            }
        })
            .then(res => {
                this.setState({isTokenValid: true})
            }).catch(error => {
                if(this.state.isTokenValid)
                    this.setState({isTokenValid: false})
        })
    }

    componentDidMount() {
        this.tokenValidation();
    }

    render() {
        return (
            <div>
                {this.state.isTokenValid ? <Home/> : <Sign isSignUp={false}/>}
            </div>
        );
    }
}

export default App;
