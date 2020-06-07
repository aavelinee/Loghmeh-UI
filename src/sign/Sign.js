import React, { Component } from 'react';
import Navbar from '../common/Navbar';
import HomeJumbotron from '../common/HomeJumbotron';
import Register from './Register';
import Footer from '../common/Footer';
import './Register.css';  

class Sign extends Component {
  
  render() {
    const isSignUp = this.props.isSignUp
    console.log(isSignUp);
    return (
      <div className="sign">
        <Navbar logo={false} account={false} cart={false} quit={false} />
        <HomeJumbotron searchBox={false} />
        <Register isSignUp={isSignUp} />
        <Footer />
      </div>
    );
  }
}

export default Sign;
