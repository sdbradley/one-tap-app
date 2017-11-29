import React, { Component } from 'react';
import { connect } from 'react-redux';
import changeRoute from 'util/changeRoute';
import Cookies from 'cookies-js';

class RequireAuth extends Component {
  componentWillMount() {
    this.requireAuth();
  }

  componentWillUpdate() {
    this.requireAuth();
  }

  requireAuth(store) {
    if (!this.isLoggedIn()) {
      let slug = Cookies.get('slug') || '';
      changeRoute(`/login/${slug}`);
    }
  }

  isLoggedIn() {
    return (!!this.props.token);
  }

  render() {
    return this.isLoggedIn() ? React.Children.only(this.props.children) : null;
  }
}

export default connect(state => ({ token: state.authentication.token }))(RequireAuth);
