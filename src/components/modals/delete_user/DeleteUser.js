import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'containers/modal';
import Button from 'components/shared/button';
import {
  deleteUser,
  DELETE_USER_SUCCESS
} from 'actions/users';
import {
    closeModal
} from 'actions/modal';

class DeleteUser extends Component {

  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
  }

  render() {
    if (!this.props.user) {
      return null;
    }
    return (
      <Modal closeAction={DELETE_USER_SUCCESS}>
          <div className='DeleteUser DeleteUser-form'>
            <h1 className='DeleteUser-title'>Delete User</h1>
            <h1 className='DeleteUser-title'>Are you sure you want to delete <strong>{this.props.user.user_name}?</strong></h1>
            <p className='DeleteUser-info'><strong>Caution:</strong> By clicking yes, the User will be permanently deleted.</p>
            <div className='DeleteUser-title'>
              <Button className='DeleteUser-button' inverse onClick={this.deleteUser}>Yes</Button>
              <Button className='DeleteUser-button' onClick={this.props.closeModal}>No</Button>
            </div>
          </div>
      </Modal>
    );
  }

  deleteUser() {
    console.log('deleteUser: ' + this.props.user.id);
    this.props.deleteUser(this.props.user.id);
  }
}

export default connect(
  (state, props) => ({ user: state.users.find(props.userId, null) }),
  { deleteUser, closeModal }
)(DeleteUser);
