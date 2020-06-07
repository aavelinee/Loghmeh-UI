import React, { Component, Fragment } from 'react';
import Navbar from '../common/Navbar'
import HomeJumbotron from '../common/HomeJumbotron';
import FoodParty from './foodparty/FoodParty'
import Restaurants from './restaurant/Restaurants'
import Footer from '../common/Footer'

import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props);
        this.restaurantRef = React.createRef();
        this.informSearch = this.informSearch.bind(this);
    }

    informSearch(restaurantName, foodName) {
        this.restaurantRef.current.getSearchedRestaurant(restaurantName, foodName, 1);
    }

    render() {
        return(
            <div className="home-content">
                <Navbar logo={false} account={true} cart={true} quit={true} />
                <HomeJumbotron searchBox={true} handleSearch={this.informSearch}/>
                <div className="home-main-content">
                    <FoodParty />
                    <Restaurants ref={this.restaurantRef}/>
                </div>
            </div>
        );
    }

}

export default Home;