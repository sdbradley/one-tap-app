import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Moment from 'react-moment';
import Widget from 'components/widget';
import Link from 'components/link';
import FetchCampaigns from 'containers/fetchers/fetch_campaigns';
import { APP_ROOT } from 'constants';
import { setPrecision } from 'util/funcs';
import { ROLE } from 'constants';

class Campaigns extends Component {

    render() {
        return (
          <FetchCampaigns id={this.props.id} role={this.props.role}>
            <Widget title="Campaigns">
              <div className="Campaigns">
                <Table
                  columns={[
                    { name: 'Name', renderer: this.renderName },
                    { name: 'Type', property: 'type'},
                    { name: 'Status', property: 'status'},
                    { name: 'Start', renderer: this.renderStartDate},
                    { name: 'End', renderer: this.renderEndDate},
                    { name: '% to Goal', renderer: this.renderProgress }
                  ]}
                  data={this.props.campaigns}
                  emptyState='No results'
                />
              </div>
            </Widget>
          </FetchCampaigns>
        );
    }
    renderName(campaign) {
      return <Link classic hard to={`${APP_ROOT}campaigns/${campaign.id}`}>{campaign.name}</Link>;
    }
    renderStartDate(c) {
      if(c.start_date) {
        return (
          <Moment format="MM/DD/YYYY">{c.start_date}</Moment>
        )
      }
    }
    renderEndDate(c) {
      if(c.end_date) {
        return (
          <Moment format="MM/DD/YYYY">{c.end_date}</Moment>
        )
      }
    }
    renderProgress(c) {
      let num_sent = c.number_of_leads;
      let opportunities = c.number_of_opportunities;
      let progress = ((num_sent > 0) ? (opportunities / num_sent) : 0);
      let pct = setPrecision(progress * 100, 2)
      return (
          <div>
            {`${pct}%`}
          </div>
      );
    }
}

export default connect(
  (state, props) => {
    let user = state.authentication.user;
    let id = (user && user.accountId);
    let campaigns = state.campaigns.all();
    let role = (user.hasRole(ROLE.STAKEHOLDER) ? ROLE.STAKEHOLDER : (user.hasRole(ROLE.ADMIN) ? ROLE.ADMIN : ROLE.PARTNER));
    return {
      user: user,
      campaigns: campaigns,
      id: id,
      role: role
    };
  }
)(Campaigns);
