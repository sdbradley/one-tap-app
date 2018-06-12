import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Widget from 'components/widget';
import Link from 'components/link';
import './css/stakeholder.scss';
import Campaigns from 'components/campaigns';
import FetchAccountPartners from 'containers/fetchers/fetch_account_partners';
import FetchCampaigns from 'containers/fetchers/fetch_campaigns';
import { APP_ROOT } from 'constants';

class StakeholderDashboard extends Component {

  render() {
    return (
    <div className="ContentWrapper ContentWrapper--admin">
      <div className="Container Container--padded">
        <div className="Widget-full">
          <h1 className="Admin-title">Stakeholder Dashboard</h1>
          <FetchCampaigns partner_id={this.props.partner_id} start_date={this.props.start_date} end_date={this.props.end_date}>
              <Widget title="Campaigns">
                <Campaigns data={this.props.campaigns} />
              </Widget>
            </FetchCampaigns>
          </div>
      </div>
    </div>
    );
  }
  renderAccount(item) {
    if(item) {
      return (
        <Link to={`${APP_ROOT}?partner_id=${item.id}`} hard classic>{item.name}</Link>
      )
    }
    return null;
  }
}

export default connect(
    // Map state to props
    (state, props) => {
      let user = state.authentication.user;
      let partner_id = (user && user.accountId);
      let accounts = state.accounts.all();
      let campaigns = state.campaigns.all();
      return {
        accounts: accounts,
        campaigns: campaigns,
        partner_id: partner_id
      };
    }
  )(StakeholderDashboard);
