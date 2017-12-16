import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'components/link';
import Form from 'components/Form';
import Field from 'components/field';
import Button from 'components/shared/button/button';
import Image from 'components/image';
import { forgotPassword, newAuthForm } from 'actions/authentication';

import './login_form.scss';

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: ''
    };
  }

  componentWillMount() {
    this.props.newAuthForm();
  }

  handleChange({ name, value }) {
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="LoginForm">
        {this.props.success === false ? this.renderForm() : this.renderEmailSent()}
      </div>
    );
  }

  renderForm() {
    let { forgotPassword, errors } = this.props;
    return (
      <div>
      <div className="LoginForm--logoContainer">
        <Image image={`https://s3.amazonaws.com/cdn.ontappipeline.com/images/otp-logo.png`} className="LoginForm--logo" title={`1Tap logo`}/>
      </div>
      <Form
        className="LoginForm-section"
        onSubmit={forgotPassword}
        errors={errors}
      >
        <h1 className="LoginForm-heading">Forgot Password</h1>
        <p className="LoginForm-helpText">Enter your email and we'll send you a link to reset your password</p>
        <Field
          className="LoginForm-field"
          name="email"
          type="text"
          errors={errors.email}
          value={this.state.email}
          onChange={this.handleChange}
        />
        <Button full submit className="LoginForm-button">Reset Password</Button>
        <p className="LoginForm-helpText">
          <Link className="LoginForm-helpText" classic to={`/login/${this.props.slug}`}>Return to Sign-in.</Link>
        </p>
      </Form>
      </div>
    );
  }

  renderEmailSent() {
    return (
      <div className="LoginForm-section">
        <h1 className="LoginForm-heading">Email Sent</h1>
        <p className="LoginForm-helpText">
          We emailed password reset instructions to <strong>{this.state.email ? ` ${this.state.email}` : ''}</strong>.
        </p>
        <p className="LoginForm-helpText">If you don't receive an email in the next few minutes, please Contact our Support team.</p>
        <Link className="LoginForm-helpText" classic to={`/login/${this.props.slug}`}>Return to Sign-in.</Link>
      </div>
    );
  }
}

export default connect(
  state => ({
    errors: state.authentication.authFormErrors.toJS(),
    success: state.authentication.authFormSuccess
  }),
  {forgotPassword, newAuthForm}
)(ForgotPasswordForm);
