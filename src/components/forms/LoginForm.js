import React from 'react';
import { connect } from 'react-redux';
import Link from 'components/link';
import Form from 'components/Form';
import Field from 'components/field';
import Button from 'components/shared/button/button';
import { login } from 'actions/authentication';

import './login_form.scss';

function LoginForm ({ errors, login, message, slug }) {
  return (
    <div className="LoginForm">
      <Form
        className="LoginForm-section"
        onSubmit={login}
        errors={errors}
      >
        <h1 className="LoginForm-heading">{ message.title }</h1>
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
