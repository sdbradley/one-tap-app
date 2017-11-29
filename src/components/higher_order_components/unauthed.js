import React, { Component } from 'react';
import { connect } from 'react-redux';
import changeRoute from 'util/changeRoute';

export default function unauthed(WrappedComponent) {
  class Unauthed extends Component {
    componentWillMount() {
      this.enforce();
    }

    componentDidUpdate() {
      this.enforce();
    }

    enforce() {
      if (this.props.authenticated) {
        changeRoute('/');
      }
    }

    render() {
      return this.props.authenticated ? null : <WrappedComponent {...this.props}/>;
    }
  }

  return connect(
    state => ({
      authenticated: !!state.authentication.token
    })
  )(Unauthed);
}
