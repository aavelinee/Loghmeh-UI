import React, {Component, useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import './Modal.css';

class ModalClass extends Component {
    constructor(props) {
      super(props);
      this.state = { show: props.show, comp: props.comp, hide:props.hide}
      this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
      this.setState({show: false});
    }

    render() {

    return (
      <div>
        <Modal className="modal-content" show={this.state.show} onHide={this.handleClose}>
          {this.state.comp}
        </Modal>
      </div>
    );
  }
}
export default ModalClass;
