import React, { Component } from 'react';
import Modal from 'components/modals/modal';
import { connect } from 'react-redux';
import { closeModal, setCloseAction } from 'actions/modal';

class ModalMount extends Component{
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    if (this.props.closeAction) {
      this.props.setCloseAction(this.props.closeAction);
    }
  }

  handleClose() {
    this.props.closeModal();
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <Modal
        children={this.props.children}
        onClose={this.handleClose}
        onMouseDown={this.props.onMouseDown}
        className={this.props.className}
      />
    );
  }
}

export default connect(
  (state) => ({
    name: state.modal.get('name'),
    payload: state.modal.get('payload')
  }),
  {
    closeModal,
    setCloseAction
  }
)(ModalMount);
