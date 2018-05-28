import React, { Component } from 'react';
import { connect } from 'react-redux';
import changeRoute from 'util/changeRoute';

export default function ensureHasRole(role, WrappedComponent) {
  class EnsureHasRole extends Component {
    componentWillMount() {
      this.enforce();
    }

    componentDidUpdate() {
      this.enforce();
    }

    shouldRedirect() {
      return !this.props.currentUser.isNull && this.props.currentUser.hasRole(role) === false;
    }

    enforce() {
      if (this.shouldRedirect()) {
        changeRoute('/', false);
      }
    }

    render() {
      return this.props.currentUser.isNull || this.shouldRedirect() ? null : <WrappedComponent {...this.props}/>;
    }
  }

  return connect(
    state => ({
      currentUser: state.authentication.user
    })
  )(EnsureHasRole);
}
