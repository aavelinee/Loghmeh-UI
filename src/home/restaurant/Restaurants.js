import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Menu from '../../menu/Menu';
import './Restaurants.css';
import Sign from "../../profile/Profile";

class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.getRestaurants = this.getRestaurants.bind(this);
        this.getSearchedRestaurant = this.getSearchedRestaurant.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.loadPrevPage = this.loadPrevPage.bind(this);
        this.renderSignin = this.renderSignin.bind(this);
        this.state = {restaurants : [], page: 1, searchPage: 1, isSearch: false,
            restNameSearch: "", foodNameSearch: ""};
    }

    componentDidMount() {
        this.getRestaurants(1);
    }

    loadNextPage() {
        console.log("page: ");
        console.log(this.state.page);
        if(this.state.isSearch == true){
            this.setState({searchPage: this.state.searchPage + 1})
            this.getSearchedRestaurant(this.state.restNameSearch,
                this.state.foodNameSearch, this.state.searchPage + 1)
        }
        else {
            this.setState({page: this.state.page + 1});
            this.getRestaurants(this.state.page + 1);
        }
    }

    loadPrevPage() {
        if(this.state.isSearch == true){
            this.setState({searchPage: this.state.searchPage - 1})
            this.getSearchedRestaurant(this.state.restNameSearch,
                this.state.foodNameSearch, this.state.searchPage - 1)
        }
        else {
            this.setState({page: this.state.page - 1});
            this.getRestaurants(this.state.page - 1);
        }
    }

    getSearchedRestaurant(restaurantName, foodName, page) {
        this.setState({isSearch: true, restNameSearch: restaurantName, foodNameSearch: foodName});
        let body = {restaurantName : restaurantName, foodName : foodName, page : page};
        axios.get("http://185.166.105.6:30570/Loghmeh_war_exploded/searched_restaurants", { params: body ,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
            }
        })
            .then(res => {
                console.log("******************************************************************************\n************************************************************************************\n************************************************************8")
                const data = res.data;
                this.setState({
                    restaurants: data
                });
            }).catch((error) => {
                if (error.response.status == 401 || error.response.status == 403) {
                    this.renderSignin();
                }
            }
        );
    }

    getRestaurants(page) {
        axios.get("http://185.166.105.6:30570/Loghmeh_war_exploded/ordinary_restaurants/" + (page), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
            }
        })
            .then(res => {
                const data = res.data;
                this.setState({
                    restaurants: data
                });
                console.log(data);
            }).catch((error) => {
            if(error.response.status == 401 || error.response.status == 403) {
                this.renderSignin();
            }
        });

    }

    renderSignin() {
        ReactDOM.render(
            <Sign isSignUp={false}/>,
            document.getElementById('root')
        );
    }

    renderRestaurantMenu(restaurant) {
        console.log("after click on show menu", restaurant);
        ReactDOM.render(
            <Menu restaurant={restaurant} />,
            document.getElementById('root')
        );
    }

    render() {
        console.log("rests", this.state.restaurants);
        // array of N elements, where N is the number of rows needed
        const rows = [...Array( Math.ceil(this.state.restaurants.length / 4) )];
        // chunk the restaurants into the array of rows
        const restaurantRows = rows.map( (row, idx) => (this.state.restaurants.slice(idx * 4, idx * 4 + 4) ));
        // map the rows as div.row
        const content = restaurantRows.map((row, idx) => (
            <div className="row home-restaurants-row" key={idx}>
                { row.map( restaurant => <div key={restaurant.id} className="home-restaurants-col col-md-3">
                    <div className="container home-restaurant">
                        <div className="row home-restpic">
                            <img  id="home-restpic" src={restaurant.logo} className="rounded" alt="Restaurant"></img>
                        </div>
                        <div className="row home-restname">
                            <p id="home-restname">{restaurant.name}</p>
                        </div>
                        <div className="row home-restmenu-btn">
                            <button type="button" id="home-restmenu-btn" onClick={this.renderRestaurantMenu.bind(this, restaurant)}>نمایش منو</button>
                        </div>
                    </div>

                </div> )}
            </div> )
        );
        return (
            <div className="container home-restaurants">
                <div className="row restaurants-heading">
                    <b id="restaurants-heading">رستوران‌ها</b>
                </div>
                {content}
                <div className="load-more-or-less">
                    <button onClick={this.loadNextPage} type="button" className="next-page-btn">صفحه بعد</button>
                    {
                        this.state.isSearch ?
                            (
                                this.state.searchPage == 1
                                    ?
                                    <button type="button" className="no-prev-page-btn">صفحه قبل</button>
                                    :
                                    <button onClick={this.loadPrevPage} type="button" className="prev-page-btn">صفحه قبل</button>
                            )
                            :
                            (
                                this.state.page == 1
                                    ?
                                    <button type="button" className="no-prev-page-btn">صفحه قبل</button>
                                    :
                                    <button onClick={this.loadPrevPage} type="button" className="prev-page-btn">صفحه قبل</button>
                            )
                    }
                </div>
            </div>
        );
    }
}

export default Restaurants;