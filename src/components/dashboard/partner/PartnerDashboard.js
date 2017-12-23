import React, { Component } from 'react';
import { connect } from 'react-redux';
import FetchOpportunities from 'containers/fetchers/fetch_opportunities';
import FetchStatistics from 'containers/fetchers/fetch_statistics';
import Widget from 'components/widget';
import Opportunities from 'components/opportunities';
import Statistics from 'components/statistics';

class PartnerDashboard extends Component {

  render() {
    return (
      <div>
        <div className="Widget-full">
          <div className="Widget-half">
            <FetchStatistics partner_id={this.props.partner_id} start_date={this.props.start_date} end_date={this.props.end_date}>
              <Widget title="Campaign Statistics">
                <Statistics data={this.props.statistics} />
              </Widget>
            </FetchStatistics>
          </div>
        </div>
        <div className="Widget-full">
          <FetchOpportunities partner_id={this.props.partner_id} stage={this.props.stage} start_date={this.props.start_date} end_date={this.props.end_date}>
            <Widget title="Upcoming Opportunities">
              <Opportunities data={this.props.opportunities} />
            </Widget>
          </FetchOpportunities>
        </div>
      </div>
    )
  }
  renderLastName(row, position) {
    return (
      <Link to={`/admin/students/${row.id}/enrollments`} blue>{row.lastName}</Link>
    );
  }
}

export default connect(
  (state, props) => {
    let opportunities = state.opportunities.all();
    let statistics = state.statistics.all();
    let user = state.authentication.user;
    let accountId = user && user.accountId;
    return {
      opportunities: opportunities,
      statistics: statistics,
      partner_id: accountId,
      stage: 'Upcoming',
      start_date: 1506834000,
      end_date: 1612139600
    };
  }
)(PartnerDashboard);
