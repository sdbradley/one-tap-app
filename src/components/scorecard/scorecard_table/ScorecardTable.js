import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';

class ScorecardTable extends Component {

    render() {
        return (
          <div className="ScorecardTable">
            <Table className="ScorecardTable-table"
              columns={[
                { name: 'Partner', property: 'account' },
                { name: 'Upcoming', property: 'prospecting'},
                { name: 'Occurred', property: 'completed'},
                { name: 'Next Steps', property: 'nextsteps'},
                { name: 'On-Site', property: 'onsite'},
                { name: 'Proposal', property: 'proposal'},
                { name: 'Closed Won', property: 'closedwon'},
                { name: 'Total', property: 'campaign_score'}
              ]}
              data={this.props.data}
              emptyState='No results'
            />
          </div>
        );
    }
}

export default connect()(ScorecardTable);
