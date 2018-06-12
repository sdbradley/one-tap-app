import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Moment from 'react-moment';
import Link from 'components/link';
import { APP_ROOT } from 'constants';
import { setPrecision } from 'util/funcs';

class Campaigns extends Component {

    render() {
        return (
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
              data={this.props.data}
              emptyState='No results'
            />
          </div>
        );
    }
    renderName(campaign) {
      return <Link classic hard to={`${APP_ROOT}campaigns/${campaign.id}`}>{campaign.name}</Link>;
    }
    renderStartDate(c) {
      if(c.start_date) {
        return (
          <Moment unix format="MM/DD/YYYY">{c.start_date}</Moment>
        )
      }
    }
    renderEndDate(c) {
      if(c.end_date) {
        return (
          <Moment unix format="MM/DD/YYYY">{c.end_date}</Moment>
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

export default connect()(Campaigns);
