import React, { Component, Fragment } from 'react';

class CountDownTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {secondsRemaining : this.props.secondsRemaining};
        this.tick = this.tick.bind(this);
    }


    tick() {
      this.setState({secondsRemaining: this.state.secondsRemaining - 1});
      if (this.state.secondsRemaining <= 0) 
        clearInterval(this.interval);      

    }

    componentDidMount() {
      this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      return (
        <div>Seconds Remaining: {this.state.secondsRemaining}</div>
      );
    }
  }

  export default CountDownTimer;