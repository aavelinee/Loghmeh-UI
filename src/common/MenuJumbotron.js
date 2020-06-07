import React, { Component} from 'react';
import RestLogo from '../images/restpic.jpeg';
import './MenuJumbotron.css';

class MenuJumbotron extends Component {
    render() {
        return(
            <div className="menu-jumbotron">
                <div className="restaurant-logo">
                    <img src={this.props.image} className="restaurant-logo" alt="Restaurant-Logo"></img>
                </div>
                <div className="restaurant-name">
                    <b className="restaurant-name">{this.props.name}</b>
                </div>
            </div>
        );
    }
}

export default MenuJumbotron;
