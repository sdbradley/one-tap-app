import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Moment from 'react-moment';
import { setPrecision } from 'util/funcs';

class Statistics extends Component {

    render() {
        return (
          <div className="Statistics">
            <Table className="Statistics-table"
              columns={[
                { name: 'Num Sent', property: 'number_sent' },
                { name: 'Opportunities', property: 'number_of_opportunities'},
                { name: '% complete', renderer: this.renderPercent}
              ]}
              data={this.props.data}
              emptyState='No results'
            />
            {this.renderProgress(this.props.data[0])}
          </div>
        );
    }
    renderPercent(data) {
        let num_sent = data.number_sent;
        let opportunities = data.number_of_opportunities;
        let pct = setPrecision((opportunities / num_sent) * 100, 2)
        return <div>{pct}%</div>;
    }
    renderProgress(data) {
        let num_sent = data.number_sent;
        let opportunities = data.number_of_opportunities;
        let progress = (opportunities / num_sent);
        let pct = setPrecision(progress * 100, 2)
        let title = `${pct}% Completed`;
        return (
            <div className="Statistics-progress" title={title}>
                <div className="Statistics-progressBar" style={{ width: `${pct}%` }}>{' '}</div>
            </div>
        );
    }
}

export default connect()(Statistics);
