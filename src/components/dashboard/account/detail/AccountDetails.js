import React, { Component } from 'react';
import { connect } from 'react-redux';

class AccountDetail extends Component {

  render() {
    return (
      <div>
        <div>{`Address: ${this.renderAddress()}`}</div>
        <div>{this.renderRevenue()}</div>
        <div>{this.renderWebsite()}</div>
      </div>
    )
  }

  renderAddress() {
    return this.props.account.billing_city && (
        `${this.props.account.billing_street},  
        ${this.props.account.billing_city}, 
        ${this.props.account.billing_state} 
        ${this.props.account.billing_postal_code}, 
        ${this.props.account.billing_country}`
    )
  }

  renderRevenue() {
    return (
      <div>{`Revenue: ${this.props.account.annual_revenue}`}</div>
    )
  }

  renderWebsite() {
    return (
        <div>Website: <a href={this.props.account.website} target="_new">{this.props.account.website}</a></div>
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
)(AccountDetail);
