import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Orders.css';
import OrderItem from './OrderItem';
import axios from 'axios';
import Sign from "../UserInfo";

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {orders : [], showModal: false, status: ""};
        this.getOrders = this.getOrders.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderSignin = this.renderSignin.bind(this);
    }

    handleShow() {
        this.setState({showModal: true});
    }

    handleClose() {
        this.setState({showModal: false});
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders() {
        axios.get("http://185.166.105.6:30138/Loghmeh_war_exploded/orders",
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
                }
            })
            .then(res => {
                const data = res.data;
                this.setState({
                    orders: data
                })
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

    render() {
        const orders = this.state.orders.reverse().map((order) =>
            <div class="container">
                <OrderItem orders={this.state.orders} order={order} />
            </div>
        );
        return (
            <div id="orders" className="orders-container container-sm border">
                {orders}
            </div>
        );
    }
}

export default Orders;