import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SITE_ROOT } from 'constants';
import Link from 'components/link';
import Form from 'components/Form';
import Field from 'components/field';
import Button from 'components/shared/button/button';
import { resetPassword, setAuthMessage, newAuthForm } from 'actions/authentication';
import changeRoute from 'util/changeRoute';

import './login_form.scss';

class SetPasswordForm extends Component {
  componentWillMount() {
    this.props.newAuthForm();
  }

  componentWillUpdate(props) {
    if (props.success) {
      props.setAuthMessage({
        title: 'Success!',
        description: 'Your account has been successfully set up. Please login below.'
      });
      changeRoute('/login');
    }
  }

  render() {
    return (
      <div className="LoginForm">
        <LogoHeader />
        <Form
          className="LoginForm-section"
          onSubmit={this.props.resetPassword}
          errors={this.props.errors}
        >
          <h1 className="LoginForm-heading">Create Password</h1>
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
          />
          <Field type="checkbox" name="terms">I agree to the <a className="Link Link--classic" href={`${SITE_ROOT}/terms-of-service/`} target="_BLANK">Terms of Service</a> and the <a className="Link Link--classic" href={`${SITE_ROOT}/privacy-policy/`} target="_BLANK">Privacy Policy</a>.</Field>
          <Button full submit className="LoginForm-button">Create Password</Button>
          <p className="LoginForm-helpText">
            <Link className="LoginForm-helpText" classic to="/login">Already have an account? Click here to Sign-in.</Link>
          </p>
        </Form>
      </div>
    );
  }
}

export default connect(
  state => ({
    errors: state.authentication.authFormErrors.toArray(),
    success: state.authentication.authFormSuccess
  }),
  {
    newAuthForm,
    setAuthMessage,
    resetPassword
  }
)(SetPasswordForm);
