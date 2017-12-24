import React, { Component } from 'react';
import { connect } from 'react-redux';

class Account extends Component {

  render() {
    return (
      <div>
        <h1 className="Dashboard-account--title">{this.props.account.name}</h1>
      </div>
    )
  }
}

export default connect(
  (state, props) => {
    let account = state.accounts.find(props.accountId);
    return {
      account: account
    };
  }
)(Account);
