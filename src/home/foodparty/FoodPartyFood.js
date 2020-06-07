import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import axios from 'axios';
import ReactStarsRating from 'react-awesome-stars-rating';
import './FoodPartyFood.css';
import FoodDetail from '../food/FoodDetail';
import PersianNumber from '../../common/PersianNumber';
import Sign from '../../sign/Sign';
import ReactDOM from "react-dom";

class FoodPartyFood extends Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false, food : props.food, foodCount: 0, msg:"", errorModal : false};
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.getFoodPartyFood = this.getFoodPartyFood.bind(this);
        this.handlePlus = this.handlePlus.bind(this);
        this.handleMinus = this.handleMinus.bind(this);
        this.handleCloseErrorModal = this.handleCloseErrorModal.bind(this);
        this.handleShowErrorModal = this.handleShowErrorModal.bind(this);

        this.renderSignIn = this.renderSignIn.bind(this);

    }


    componentDidMount(){
        this.getCountTimer = setInterval(
            () => this.getFoodPartyFood(this.props.food.restaurantId, this.props.food.name),
            4000
          );
    }


    componentWillUnmount() {
        clearInterval(this.getCountTimer);
    }

    renderSignIn() {
        console.log("in render sign in");
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

    handleShowErrorModal() {
        this.setState({errorModal: true});
    }

    handleCloseErrorModal() {
        this.setState({errorModal: false});
    }

    handlePlus() {
        this.setState({foodCount: this.state.foodCount + 1});
    }

    handleMinus() {
        if(this.state.foodCount == 0){
            return;
        }
        this.setState({foodCount: this.state.foodCount - 1});
    }

    addToCart(foodName, foodCount) {
        console.log("state foodCount: ", this.state.food.restaurantId," - ", foodCount, foodName);
        event.preventDefault();
		axios.put('http://loghmeh-back:8080/Loghmeh_war_exploded/put_cart', null,
			{params: {
                'restaurantId': this.state.food.restaurantId,
                'foodName' : foodName,
                'foodCount': foodCount,
                'isFoodParty' : true},
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
            }}
		).then( (response) => {
            this.setState({foodCount : 0})
            this.getFoodPartyFood(this.state.food.restaurantId, foodName);})
        .catch((error) => {
            if (error.response.status == 400) {
                this.setState({msg:"شما مجاز به سفارش غذا از رستوران‌های متفاوت نیستید."});
                this.handleShowErrorModal();
            } else if (error.response.status == 401 || error.response.status == 403){
                console.log(error);
                this.renderSignIn();
            } else {
                console.log(error);
            }
          })    
    }

    handleAddToCart() {
        // this.handlePlus();
        this.addToCart(this.state.food.name, 1);
    }

    updateCount(count) {
        this.setState({ food: { ...this.state.food, count: count} });
        // if(count == 0) {
        //     document.getElementsByClassName("foodparty-buy-btn").style.background="gray";
        //     document.getElementsByClassName("foodparty-buy-btn").style.border="gray";
        // }
    }

    getFoodPartyFood(restaurantId, foodName) {
        console.log("getFoodPartyFood is called", foodName);
        let body = {restaurantId : restaurantId, foodName : foodName}
    	axios.get("http://loghmeh-back:8080/Loghmeh_war_exploded/foodparty_food", { params: body ,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
            }
        })
		.then(res => {
            const data = res.data;
			this.updateCount(data.count);
        }).catch(error => {
            console.log("inja dge namusan!");
            if (error.response.status == 401 || error.response.status == 403){
                console.log(error);
                console.log("in caaaaaaatch!!");
                this.renderSignIn();
            }
        })
    }

    render() {
        return (
            <div className="container foodparty-food">
                <div className="food-party-food-border">
                    <div className="row foodparty-food-row foodparty-foodinfo">
                        <div className="right-foodparty-foodinfo col-md-6" onClick={this.handleShow}>
                            <img  id="foodparty-foodimg" src={this.state.food.image} className="rounded" alt="Food"></img>
                        </div>
                        <div className="left-foodparty-foodinfo col-md-6">
                            <div className="row foodparty-foodname">
                                <p id="foodparty-foodname">{this.state.food.name}</p>
                            </div>
                            <div className="row food-star-icon foodRate">
                            <span id="foodpartyfood-popularity">{<PersianNumber number={this.state.food.popularity}>}</PersianNumber>}
                            <ReactStarsRating isEdit={false} count={1} value={1} secondaryColor={'orange'} size={12}/>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="row foodparty-food-row foodparty-price">
                        <div className="right-foodparty-price col-md-6">
                            <p id="prevPrice"><PersianNumber number={this.state.food.oldPrice} /></p>
                        </div>
                        <div className="left-foodparty-price col-md-6">
                            <p id="curPrice"><PersianNumber number={this.state.food.price} /></p>
                        </div>
                    </div>
                    <div className="row foodparty-food-row foodparty-buy">
                        <div className="right-foodparty-countLeft col-md-6">
                            {this.state.food.count > 0 ?
                                <p id="countLeft">موجودی: <b className="foodparty-count"><PersianNumber number={this.state.food.count} /></b></p>
                                : 
                                <p id="countLeft">ناموجود</p>
                            }
                        </div>
                        <div className="left-foodparty-buy col-md-6">                        
                            {this.state.food.count > 0 ?
                                <button type="button" className="foodparty-buy-btn" onClick={this.handleAddToCart}>خرید</button>
                            : 
                                <button type="button" className="foodparty-cant-buy-btn">خرید</button>
                            }
                        </div>
                    </div>
                    <div className="row foodparty-food-row foodparty-restname">
                        <div className="foodparty-restaurantname">
                            <p id="foodparty-restaurantname">{this.state.food.restaurantName}</p>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <FoodDetail foodDetail={this.state.food} isFoodParty={true} foodCount={this.state.foodCount} onClickPlus={this.handlePlus} onClickMinus={this.handleMinus} onClickAddToCart={this.addToCart} />
                </Modal>
                <Modal show={this.state.errorModal} onHide={this.handleCloseErrorModal} ><p id="error-msg">{this.state.msg}</p></Modal>
            </div>
        );
    }
}

export default FoodPartyFood;
