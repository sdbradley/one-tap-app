import React, { Component } from 'react';
import { connect } from 'react-redux';
import FetchAccount from 'containers/fetchers/fetch_account';
import FetchOpportunity from 'containers/fetchers/fetch_opportunity';
import Widget from 'components/widget';

class OpportunityDatasheet extends Component {

  render() {
    return (
      <div>
        <FetchAccount accountId={this.props.accountId}>
          <FetchOpportunity opportunityId={this.props.opportunityId}>
            <div className="Widget-full">
              <Widget title="Opportunity Datasheet"></Widget>
              <div>{this.props.account.billing_street}</div>
            </div>
          </FetchOpportunity>
        </FetchAccount>
      </div>
    )
  }
}

export default connect(
  (state, props) => {
    let user = state.authentication.user;
    return {
      accountId: props.params.accountId,
      account: state.accounts.find(props.params.accountId),
      opportunityId: props.params.opportunityId,
      opportunity: state.opportunities.find(props.params.opportunityId),
      start_date: state.navigation && state.navigation.startDate,
      end_date: state.navigation && state.navigation.endDate
    };
  }
)(OpportunityDatasheet);
