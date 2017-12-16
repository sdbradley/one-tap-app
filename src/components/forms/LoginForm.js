import React from 'react';
import { connect } from 'react-redux';
import Link from 'components/link';
import Form from 'components/Form';
import Field from 'components/field';
import Button from 'components/shared/button/button';
import Image from 'components/image';
import { login } from 'actions/authentication';

import './login_form.scss';

function LoginForm ({ errors, login, message, slug }) {
  return (
    <div className="LoginForm">
      <div className="LoginForm--logoContainer">
        <Image image={`https://s3.amazonaws.com/cdn.ontappipeline.com/images/otp-logo.png`} className="LoginForm--logo" title={`1Tap logo`}/>
      </div>
      <Form
        className="LoginForm-section"
        onSubmit={login}
        errors={errors}
      >
        {
          message.description
            ? <p className="LoginForm-helpText">{message.description}</p>
            : null
        }
        <Field
          className="LoginForm-field"
          name='email'
          label='Email'
          type='text'
        />
        <Field
          className="LoginForm-field"
          name='password'
          label='Password'
          type='text'
          obscured
        />
        <Button full submit className="LoginForm-button">Login</Button>
        <p className="LoginForm-helpText">
          Forgot your login details? <Link classic to={`/forgot-password/${slug}`}>Get help signing in.</Link>
        </p>
      </Form>
    </div>
  );
}

export default connect(
  state => ({
    message: state.authentication.message || {
      title: 'Login to 1Tap',
      description: null
    },
    errors: state.authentication.errors.toJS()
  }),
  {login}
)(LoginForm);
