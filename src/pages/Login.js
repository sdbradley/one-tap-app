import React, { Component } from 'react';
import LoginForm from 'components/forms/LoginForm';
import App from 'components/App';
import Cookies from 'cookies-js';

class Login extends Component {
  render() {
    var slug = Cookies.get('slug') || (this.props.params && this.props.params.slug) ? this.props.params.slug : '';
    Cookies.set("slug", slug, { expires: Infinity });
    return (
      <App page='login' showNav={false} slug={slug} minimal>
        <LoginForm slug={slug} />
      </App>
    );
  }
}

export default Login;
