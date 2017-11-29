import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SITE_ROOT } from 'constants';
import Link from 'components/link';
import Form from 'components/Form';
import Field from 'components/field';
import Button from 'components/shared/button/button';
import LogoHeader from './LogoHeader';
import { signup, newAuthForm } from 'actions/authentication';

import './login_form.scss';

class SignUpForm extends Component {
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
        <LogoHeader />
        {this.props.success === false ? this.renderForm() : this.renderEmailSent()}
      </div>
    );
  }

  renderForm() {
    let { signup, errors } = this.props;
    return (
      <Form
        className="LoginForm-section"
        onSubmit={signup}
        errors={errors}
      >
        <h1 className="LoginForm-heading">Create Student Account</h1>
        <Field
          className="LoginForm-field"
          name="first_name"
          label="First Name"
          type="text"
          errors={errors.first_name}
        />
        <Field
          className="LoginForm-field"
          name="last_name"
          label="Last Name"
          type="text"
          errors={errors.last_name}
        />
        <Field
          className="LoginForm-field"
          name="email"
          label="Email"
          type="text"
          errors={errors.email}
          value={this.state.email}
          onChange={this.handleChange}
        />
        <Field
          className="LoginForm-field"
          name="password"
          label="Password"
          type="password"
          errors={errors.password}
        />
        <Field type="checkbox" name="terms">I agree to the <a className="Link Link--classic" href={`${SITE_ROOT}/terms-of-service/`} target="_BLANK">Terms of Service</a> and the <a className="Link Link--classic" href={`${SITE_ROOT}/privacy-policy/`} target="_BLANK">Privacy Policy</a>.</Field>
        <Button full submit className="LoginForm-button">Create My Account</Button>
        <p className="LoginForm-helpText">
          Already have an account? <Link classic to={`/login/${this.props.slug}`}>Log in.</Link>
        </p>
      </Form>
    );
  }

  renderEmailSent() {
    return (
      <div className="LoginForm-section">
        <h1 className="LoginForm-heading">Success!</h1>
        <p className="LoginForm-helpText">
          Your account has been successfully created! Click the link below to go to the Login page.
        </p>
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
  {
    newAuthForm,
    signup
  }
)(SignUpForm);
