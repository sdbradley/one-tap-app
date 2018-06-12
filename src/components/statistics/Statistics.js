import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import { setPrecision } from 'util/funcs';

class Statistics extends Component {

    render() {
        console.log('Statistics: ' + JSON.stringify(this.props.data));
        return (
          <div className="Statistics">
            <Table className="Statistics-table"
              columns={[
                { name: 'Lead Goal', renderer: this.renderNumberOfLeads },
                { name: 'Lead Actual', renderer: this.renderNumberOfOpportunities},
                { name: '% To Goal', renderer: this.renderPercent}
              ]}
              data={this.props.data && [this.props.data]}
              emptyState='No results'
            />
            {this.renderProgress(this.props.data)}
          </div>
        );
    }
    renderNumberOfLeads(data) {
        let number_of_leads = 0;
        if(data && data.number_of_leads) {
          number_of_leads = data.number_of_leads;
        }
        return <div>{number_of_leads}</div>;
    }
    renderNumberOfOpportunities(data) {
        let number_of_opportunities = 0;
        if(data && data.number_of_opportunities) {
          number_of_opportunities = data.number_of_opportunities;
        }
        return <div>{number_of_opportunities}</div>;
    }
    renderPercent(data) {
        let num_sent = data.number_of_leads;
        let opportunities = data.number_of_opportunities;
        let pct = ((num_sent > 0) ? setPrecision((opportunities / num_sent) * 100, 2) : 0);
        return <div>{pct}%</div>;
    }
    renderProgress(data) {
        if(data) {
            let num_sent = data.number_of_leads;
            let opportunities = data.number_of_opportunities;
            let progress = (opportunities / num_sent);
            let pct = setPrecision(progress * 100, 2)
            let title = `${pct}% Completed`;
            return (
                <div className="Statistics-progress" title={title}>
                    <div className="Statistics-progressBar" style={{ width: `${pct}%` }}>{' '}</div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default connect()(Statistics);
