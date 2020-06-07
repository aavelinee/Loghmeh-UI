import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import ReactStarsRating from 'react-awesome-stars-rating';
import './FoodItem.css';
import PersianNumber from '../../../common/PersianNumber';
import FoodDetail from '../../../home/food/FoodDetail';

class FoodItem extends Component {
    constructor(props) {
        super(props);
        this.state = {food : props.food, isAvailable : props.isAvailable, 
                        showModal: false, foodCount: 0};
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handlePlus = this.handlePlus.bind(this);
        this.handleMinus = this.handleMinus.bind(this);
    }

    handleShow() {
        this.setState({showModal: true});
    }
    
    handleClose() {
        this.setState({showModal: false});
    }

    handlePlus() {
        console.log("on click plus: ", this.state);
        this.setState({foodCount: this.state.foodCount + 1});
    }

    handleMinus() {
        console.log("on click minus: ", this.state);
        if(this.state.foodCount == 0){
            return;
        }
        this.setState({foodCount: this.state.foodCount - 1});
    }

    render() {
            return(
                <form className="food">
                    <div className="food-item-modal">
                        <div className="food-image" onClick={this.handleShow}>
                            <img src={this.state.food.image} className="rounded" alt="Food" ></img>
                        </div>
                        <div className="fooditem-info container">
                            <div className="row fooditem-namestar">
                                <div className="fooditem-name col-md-9">
                                    <b>{this.state.food.name}</b>
                                </div>
                                <div className="fooditem-star col-md-3">
                                    <span id="fooditem-rating"><PersianNumber number={this.state.food.popularity} />
                                    <ReactStarsRating isEdit={false} count={1} value={1} secondaryColor={'orange'} size={12}/>          
                                    </span>                  
                                </div>
                            </div>
                            <div className="row fooditem-price">
                                <p id="fooditem-price"><PersianNumber number={this.state.food.price} /> تومان</p>
                            </div>
                            <div className="row fooditem-buy-btn">
                                {this.props.isAvailable ? 
                                    <button type="button" className="available-btn" onClick={() => this.props.onClickBuy(this.props.food.name, 1)}>افزودن به سبد خرید</button>
                                    :
                                    <button type="button" className="notavailable-btn">ناموجود</button>
                                }
                            </div>
                        </div>
                    </div>
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <FoodDetail isFoodParty={false} foodDetail={this.state.food} foodCount={this.state.foodCount} onClickPlus={this.handlePlus} onClickMinus={this.handleMinus} onClickAddToCart={this.props.onClickBuy} />
                    </Modal>
                </form>
            );
        }
}

export default FoodItem;
