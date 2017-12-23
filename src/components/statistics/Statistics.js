import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Moment from 'react-moment';

class Statistics extends Component {

    render() {
        return (
          <div className="Statistics">
            <Table
              columns={[
                { name: 'Num Sent', property: 'number_sent' },
                { name: 'Opportunities', property: 'number_of_opportunities'}
              ]}
              data={this.props.data}
              emptyState='No results'
            />
          </div>
        );
    }
}

export default connect()(Statistics);
