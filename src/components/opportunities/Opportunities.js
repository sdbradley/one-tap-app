import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Moment from 'react-moment';

class Opportunities extends Component {

    render() {
        return (
          <div className="Opportunities">
            <Table
              columns={[
                { name: 'Name', property: 'name' },
                { name: 'Partner', property: 'partner'},
                { name: 'Stage', property: 'stage_name'},
                { name: 'Meeting Time', property: 'meeting_date_time__c', renderer: this.renderDateTime }
              ]}
              data={this.props.data}
              emptyState='No results'
            />
          </div>
        );
    }

    renderDateTime(opportunity) {
        return (
            <Moment unix format="ddd MMM DD, YYYY hh:mm a">{opportunity.meeting_date_time__c}</Moment>
        )
    }
}

export default connect()(Opportunities);
