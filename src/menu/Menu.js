import React, { Component, Fragment } from 'react';
import './Menu.css';  
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import MenuJumbotron from '../common/MenuJumbotron';
import Cart from './cart/Cart';
import Food from './food/Food';

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {restaurant: props.restaurant}
        this.cartElement = React.createRef();
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    handleAddToCart(foodName, foodCount) {
        console.log("in menu add to cart: ", foodName);
        this.cartElement.current.addToCart(this.state.restaurant.id, foodName, false, foodCount);
    }

    handleGetCart() {
        this.cartElement.current.getCart();
    }

    render() {
        console.log("in menu", this.state.restaurant);
        return(
            <Fragment>
                <Navbar logo={true} account={true} cart={true} quit={true} />
                <MenuJumbotron name={this.state.restaurant.name} image={this.state.restaurant.logo}/>
                <div className="menu-main-content container">
                    <div className="menu-name row">
                        <b id="menu-name">منوی غذا</b>
                    </div>
                    <div className="menu-container row">
                        <div className="menu-right col-md-4">
                            <div className="cart-container-right-col">
                                <Cart ref={this.cartElement} restaurantId={this.state.restaurant.id}/>
                            </div>
                        </div>
                        <div className="menu-left col-md-8">
                            <div className="menu-food-form container">
                                <Food onClickBuy={this.handleAddToCart} menu={this.state.restaurant.menu}/>
                            </div>
                        </div>
                    </div>  
                </div>
                <Footer />
        </Fragment>
        );
    }
}

export default Menu