import React, { Component, Children } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Loader from 'components/loader';

export function createFetcher(needsToFetchCB, fetch, { showLoader = false } = {}) {
  class Fetcher extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fetching: false
      };
    }

    componentWillMount() {
      this.mounted = true;
      this.fetch(this.props, this.state);
    }

    componentWillUpdate(nextProps, nextState) {
      this.fetch(nextProps, nextState);
    }

    fetch({ needsToFetch, fetch, ...props }, { fetching }) {
      if (needsToFetch && !this.state.fetching) {
        let p = fetch(props);
        if (p && p.then) {
          this.safeSetState({ fetching: true });
          p.then(() => this.safeSetState({ fetching: false }));
          p.catch(() => this.safeSetState({ fetching: false }));
        }
      }
    }

    safeSetState(state) {
      if (this.mounted) {
        this.setState(state);
      }
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      return this.props.needsToFetch || this.state.fetching ? this.renderLoading() : Children.only(this.props.children);
    }

    renderLoading() {
      let loaderProps = (showLoader || this.props.loader)
      return loaderProps
        ? <Loader {...loaderProps}/>
        : null;
    }
  }

  return withRouter(connect(
    (state, props) => ({
      user: state.authentication.user,
      needsToFetch: needsToFetchCB(state, props)
    }),
    { fetch }
  )(Fetcher));
}
