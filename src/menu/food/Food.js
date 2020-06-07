import React, { Component, Fragment } from 'react';
import './Food.css';
import FoodItem from './foodItem/FoodItem';
class Food extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log("in food: ", this.props.menu);
        const rows = [...Array( Math.ceil(this.props.menu.foods.length / 3) )];
        // chunk the menu into the array of rows
        const menuRows = rows.map( (row, idx) => (this.props.menu.foods.slice(idx * 3, idx * 3 + 3) ));
        // map the rows as div.row
        const content = menuRows.map((row, idx) => (
            <div className="row food-in-column" key={idx}>
            { row.map( food => <div key={food.name} className="food-in-row col-md-4">
                <FoodItem food={food} isAvailable={true} onClickBuy={this.props.onClickBuy} />
            </div> )}
        </div> )
        );
        return (
            <Fragment>
                {content}
            </Fragment>
        );
    }
}

export default Food;
