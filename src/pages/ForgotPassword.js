import React, { Component } from 'react';
import ForgotPasswordForm from 'components/forms/ForgotPasswordForm';
import App from 'components/App';

class ForgotPassword extends Component {
  render() {
    var slug = (this.props.params && this.props.params.slug) ? this.props.params.slug : '';
    return (
      <App page='forgotPassword' showNav={false} slug={slug} minimal>
        <ForgotPasswordForm slug={slug} />
      </App>
    );
  }
}

export default ForgotPassword;
