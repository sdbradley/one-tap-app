import React, { Component } from 'react';
import { connect } from 'react-redux';
import FetchOpportunities from 'containers/fetchers/fetch_opportunities';
import Opportunities from 'components/opportunities';

class PartnerDashboard extends Component {

  render() {
    return (
      <FetchOpportunities partner_id="0014000001WQZcQAAX" stage="Upcoming" start_date="1312139600" end_date="1612139600">
        <Opportunities data={this.props.opportunities} />
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
      opportunities: opportunities
    };
  }
)(PartnerDashboard);