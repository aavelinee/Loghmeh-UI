import React, { Component } from 'react';
import LOGO from '../images/LOGO.png';

import './HomeJumbotron.css'

class HomeJumbotron extends Component {
    constructor(props) {
        super(props);
        this.state = {searchedRestaurant : "", searchedFood : ""}
        this.handleRestaurantInput = this.handleRestaurantInput.bind(this);
        this.handleFoodInput = this.handleFoodInput.bind(this);
    }

    handleFoodInput() {
        this.setState(prevState => ({searchedFood : event.target.value}));
    }

    handleRestaurantInput() {
        this.setState(prevState => ({searchedRestaurant : event.target.value}));
    }

    render() {
        return(
            <div className="container-fluid home-jumbotron">
                <div className="container-fluid home-red-jumbotron">
                    <div className="row  home-jumbotron-row home-loghmeh-logo">
                        <img className="home-loghmeh-img"  src={LOGO} alt="Loghmeh-Logo"></img>
                    </div>
                    <div className="row home-jumbotron-row homeTitle">
                        <h1 className="homeHeading">اولین و بزرگ‌ترین وب‌سایت سفارش آنلاین غذا در دانشگاه تهران</h1>
                    </div>
                    {this.props.searchBox &&
                        <div className="row  home-jumbotron-row searchBox">
                            <form className="search-form form-inline" onSubmit={() => this.props.handleSearch(this.state.searchedRestaurant, this.state.searchedFood)}>
                                <label className="sr-only" htmlFor="inlineFormInputName2">Credit</label>
                                <input type="text" className="foodname-input form-control mb-2 mr-sm-2" id="inlineFormInputName2"
                                    placeholder="نام غذا" onChange={this.handleFoodInput}></input>
                                <input type="text" className="restname-input form-control mb-2 mr-sm-2" id="inlineFormInputName2"
                                    placeholder="نام رستوران" onChange={this.handleRestaurantInput}></input>
                                <button type="submit" className="search-btn">جست‌و‌جو</button>
                            </form>
                        </div>
                    }
                </div>

            </div>
        );
    }
}

export default HomeJumbotron;