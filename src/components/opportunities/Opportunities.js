import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';

class Opportunities extends Component {

    render() {
        return (
          <div className="Dashboard">
            <Table
              columns={[
                { name: 'Name', property: 'name' },
                { name: 'Partner', property: 'partner'},
                { name: 'Stage', property: 'stage_name'},
                { name: 'Date/Time', property: 'meeting_date_time__c' }
              ]}
              data={this.props.data}
              emptyState='No results'
            />
          </div>
        );
    }
}

export default connect()(Opportunities);
