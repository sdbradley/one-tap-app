import React, { Component } from 'react';
import { connect } from 'react-redux';
import FetchOpportunities from 'containers/fetchers/fetch_opportunities';
import Widget from 'components/widget';
import Opportunities from 'components/opportunities';

class PartnerDashboard extends Component {

  render() {
    return (
      <FetchOpportunities partner_id={this.props.partner_id} stage={this.props.stage} start_date={this.props.start_date} end_date={this.props.end_date}>
        <Widget title="Upcoming Opportunities">
          <Opportunities data={this.props.opportunities} />
        </Widget>
      </FetchOpportunities>
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
    return {
      opportunities: opportunities,
      partner_id: '0014000001WQZcQAAX',
      stage: 'Upcoming',
      start_date: 1312139600,
      end_date: 1612139600
    };
  }
)(PartnerDashboard);