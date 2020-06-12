import React, { Component, Fragment } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import CartItem from './cartItem/CartItem';
import {Modal} from 'react-bootstrap';
import './Cart.css';
import PersianNumber from '../../common/PersianNumber';
import Sign from "../../sign/Sign";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {cart : null, showModal: false, msg:""};
        this.getCart = this.getCart.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.handlePlusAddToCart = this.handlePlusAddToCart.bind(this);
        this.handleMinusRemoveFromCart = this.handleMinusRemoveFromCart.bind(this);
        this.handleFinalize = this.handleFinalize.bind(this);

        this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.renderSignin = this.renderSignin.bind(this);


    }

    componentDidMount() {
        this.getCart();
    }

    renderSignin() {
        ReactDOM.render(
            <Sign isSignUp={false}/>,
            document.getElementById('root')
        );
    }

    getCart() {
        console.log("getCart is called");
    	axios.get("http://185.166.105.6:32112/Loghmeh/cart", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
            }
        })
		.then(res => {
            const data = res.data;
			this.setState({ 
				cart : data
			});
        }).catch(error => {
            if(error.response.status == 401 || error.response.status == 403) {
                this.renderSignin();
            } else {
                console.log(error);
            }
        })
    }


    addToCart(restaurantId, foodName, isFoodParty, foodCount) {
        console.log("order moreeeeeeeeee in cart", isFoodParty);
        console.log(foodCount)
        event.preventDefault();
		axios.put('http://185.166.105.6:32112/Loghmeh/put_cart', null,
			{ 
                params: {'restaurantId': restaurantId, 'foodName' : foodName, 'isFoodParty' : isFoodParty, 'foodCount' : foodCount},
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
                }}
		).then( (response) => {this.getCart();})
        .catch((error) => {
            if (error.response.status == 400) {
                this.setState({msg:"شما مجاز به سفارش غذا از رستوران‌های متفاوت نیستید."});
                this.handleShow();
            } else if(error.response.status == 401 || error.response.status == 403) {
                this.renderSignin();
            } else {
                console.log(error);
            }
          })    
    }

    removeFromCart(restaurantId, foodName, isFoodParty) {
        console.log("order lessssssss", isFoodParty);
        // event.preventDefault();
		axios.delete('http://185.166.105.6:32112/Loghmeh/del_cart',
			{ 
                params: {'restaurantId': restaurantId, 'foodName' : foodName, 'isFoodParty' : isFoodParty},
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
                }}
		).then( (response) => {this.getCart();})
        .catch((error) => {
            if(error.response.status == 401 || error.response.status == 403) {
                this.renderSignin();
            } else {
                console.log(error);
            }
          })
    }

    handlePlusAddToCart(foodName, isFoodParty, foodCount) {
        console.log("order moreeeeeeeeee in cart", isFoodParty);
        console.log("hhhhhhhhhhhhhh", foodCount, foodName);
        this.addToCart(this.state.cart.restaurantId, foodName, isFoodParty, foodCount);

    }

    handleMinusRemoveFromCart(foodName, isFoodParty, foodCount) {
        console.log("on click minus: ", foodName, this.state);
        this.removeFromCart(this.state.cart.restaurantId, foodName, isFoodParty);
    }

    handleFinalize() {
        console.log("finaliiiiiize");
        event.preventDefault();
		axios.put('http://185.166.105.6:32112/Loghmeh/finalize', null,
			{ headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
                    }}
		).then( (response) => {this.getCart()})
        .catch((error) => {
            if (error.response.status == 400) {
                if(error.response.data.errorMsg == "no credit") {
                    this.setState({msg:"اعتبار شما کافی نیست."});
                    this.handleShow();
                }
                else if(error.response.data.errorMsg == "count problem") {
                    this.setState({msg:"سفارش شما بیشتر از موجودی غذاست."});
                    this.handleShow();
                }
                else if(error.response.data.errorMsg == "time problem") {
                    this.getCart();
                    this.setState({msg:"مهلت جشن غذای سفارش شما به پایان رسید."});
                    this.handleShow();
                }
                else if(error.response.data.errorMsg == "both problem") {
                    this.setState({msg:"مهلت جشن غذای سفارش شما به پایان رسید."});
                    this.handleShow();
                }
            } else if(error.response.status == 401 || error.response.status == 403) {
                this.renderSignin();
            } else {
                console.log(error);
            }
          })  
    }

    handleShow() {
		this.setState({showModal: true});
	}

	handleClose() {
		this.setState({showModal: false});
	}

    render() {
        console.log("cart", this.state.cart);
        var cartItems;
        if(this.state.cart){
            console.log("null nis");
            cartItems = this.state.cart.orders.map((order) =>
            <CartItem name={order.food.name} number={order.orderCount} price={order.food.price} isFoodParty={order.isFoodParty} onClickPlus={this.handlePlusAddToCart} onClickMinus={this.handleMinusRemoveFromCart} key={order.food.name}/>);
        }
        console.log("cart item var: ", cartItems);

        return(
            <div className="cart container border">
                <div className="row shopping-cart-row">
                    <p id="shopping-cart"><b>سبد خرید</b></p>
                </div>
                { this.state.cart ? 
                    <Fragment>
                    <div className="row cart-items-row">
                        <div className="cart-items container">
                            {cartItems}
                        </div>
                    </div>
                    <div className="row cart-total-row">
                        <p className="cart-total-price">جمع کل: <b><PersianNumber number={this.state.cart.totalPrice} /> تومان</b></p>
                    </div>
                    <div className="row cart-button-row">
                        <button type="button" className="cart-buy-btn" onClick={this.handleFinalize} >تأیید نهایی</button>
                    </div>   
                    </Fragment>         
                : <p id="empty-cart">سبد خرید شما خالی است.</p>
                       
                }
                <Modal show={this.state.showModal} onHide={this.handleClose} ><p id="error-msg">{this.state.msg}</p></Modal>

            </div>
        );
    }
}

export default Cart;
