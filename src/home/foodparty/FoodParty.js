import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import moment from 'moment';
import './FoodParty.css';
import FoodPartyFood from './FoodPartyFood';
import PersianNumber from '../../common/PersianNumber';
import Sign from '../../sign/Sign';


class FoodParty extends Component {
    constructor(props) {
        super(props);
        this.getFoodPartyFoods = this.getFoodPartyFoods.bind(this);
        this.tick = this.tick.bind(this);
        this.state = {foodPartyFoods : [], remainingTime : 120 };
        this.renderSignIn = this.renderSignIn.bind(this);
    }

    componentDidMount() {
        this.getFoodPartyFoods();
        this.getNextFoodPartyUpdateDelay();

        this.pageTime = setInterval(this.tick, 1000);
    }



    componentWillUnmount() {
        clearInterval(this.getFoodPartyFoodsTimer);
        clearInterval(this.pageTime);
    }

    tick() {
        if(this.state.remainingTime > 0)
            this.setState({
            remainingTime: this.state.remainingTime - 1
            });
      }
    firstFoodPartyGetHandler() {
        this.getFoodPartyFoods();
        clearInterval(this.getFoodPartyFoodsTimer);

        this.getFoodPartyFoodsTimer = setInterval(
            () => this.getFoodPartyFoods(),
            120 * 1000
        );
    }
    renderSignIn() {
        console.log("in render sign in");
        ReactDOM.render(
            <Sign isSignUp={false}/>,
            document.getElementById('root')
        );
    }
    getNextFoodPartyUpdateDelay() {
        axios.get("http://185.166.105.194:31356/Loghmeh_war_exploded/next_time", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
            }
        })
        .then(res => {
            const data = res.data;
            console.log("timeee:", data);
            this.setState({
                remainingTime : data
            });
            this.getFoodPartyFoodsTimer = setInterval(
                () => this.firstFoodPartyGetHandler(),
                (data+1) * 1000
                );
        }).catch(error => {
            console.log("inja dge namusan!");
            if (error.response.status == 401 || error.response.status == 403){
                console.log(error);
                console.log("in caaaaaaatch!!");
                this.renderSignIn();

            }});
    }

    getFoodPartyFoods() {
        this.setState(
            {
                remainingTime : 120
            });
        axios.get("http://185.166.105.194:31356/Loghmeh_war_exploded/foodparty_foods",
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
                }
            })
            .then(res => {
            const data = res.data;
            this.setState({ 
                foodPartyFoods: data
                });
            console.log(data);
        }).catch(error => {
            console.log("inja dge namusan!");
            if (error.response.status == 401 || error.response.status == 403){
                console.log(error);
                console.log("in caaaaaaatch!!");
                this.renderSignIn();
            }
        });
    }

    render() {

        var foodPartyItems;
        if(this.state.foodPartyFoods){
            foodPartyItems = this.state.foodPartyFoods.map((foodPartyFood) =>
            <FoodPartyFood food={foodPartyFood} key={foodPartyFood.name + foodPartyFood.restaurantName}/>);
        }
        
        return (
            <div className="container-fluid food-party">
                <div className="row foodparty-row foodparty-title">
                    <h1 className="foodparty-heading">
                        <b id="foodparty-heading">جشن غذا!</b>
                    </h1>
                </div>
                <div className="row foodparty-row foodparty-time">
                    <h1 className="remaining-time">زمان باقی‌مانده: {<PersianNumber number={moment().startOf('day')
                                                                    .seconds(this.state.remainingTime)
                                                                    .format('H:mm:ss')} />}</h1>
                </div>
                <div className="row foodParyFoods">
                    {/* <BaseCrousel>  */}
                    {foodPartyItems} 
                    {/* </BaseCrousel> */}


                </div>
            </div>
        );
    }

}

export default FoodParty;