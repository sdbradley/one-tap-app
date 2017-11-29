import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'components/Form';
import Field from 'components/field';
import Button from 'components/shared/button/button';
import { resetPassword, setAuthMessage, newAuthForm } from 'actions/authentication';
import changeRoute from 'util/changeRoute';

import './login_form.scss';

class ResetPasswordForm extends Component {
  componentWillMount() {
    this.props.newAuthForm();
  }

  componentWillUpdate(props) {
    if (props.success) {
      props.setAuthMessage({
        title: 'Success!',
        description: 'Your password has been reset. Please login below with your new password.'
      });
      changeRoute('/login');
    }
  }

  render() {
    return (
      <div className="LoginForm">
        <Form
          className="LoginForm-section"
          onSubmit={this.props.resetPassword}
          errors={this.props.errors}
        >
          <h1 className="LoginForm-heading">Reset Password</h1>
          <p className="LoginForm-helpText">
            Enter a new password.
          </p>
          <Field
            type='hidden'
            name='token'
            value={this.props.token}
          />
          <Field
            className="LoginForm-field"
            name="email"
            label="Email"
            type="text"
            uneditable
            value={this.props.email}
          />
          <Field
            className="LoginForm-field"
            name="password"
            label="New Password"
            type="password"
            errors={this.props.errors.password}
          />
          <Button full submit className="LoginForm-button">Reset Password</Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  state => ({
    errors: state.authentication.authFormErrors.toJS(),
    success: state.authentication.authFormSuccess
  }),
  {
    newAuthForm,
    setAuthMessage,
    resetPassword
  }
)(ResetPasswordForm);
