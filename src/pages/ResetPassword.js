import React, { Component } from 'react';
import ResetPasswordForm from 'components/forms/ResetPasswordForm';
import App from 'components/App';

class ResetPassword extends Component {
  render() {
    return (
      <App page="resetPassword" showNav={false} minimal>
        <ResetPasswordForm email={decodeURIComponent(this.props.params.email)} token={this.props.params.token}/>
      </App>
    );
  }
}

export default ResetPassword;
