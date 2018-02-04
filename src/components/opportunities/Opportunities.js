import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Moment from 'react-moment';
import Link from 'components/link';

class Opportunities extends Component {

    render() {
        return (
          <div className="Opportunities">
            <Table
              columns={[
                { name: 'Name', property: 'name' },
                { name: 'Partner', renderer: this.renderPartner},
                { name: 'Stage', property: 'stage_name'},
                { name: 'Meeting Time', property: 'meeting_date_time__c', renderer: this.renderDateTime }
              ]}
              data={this.props.data}
              emptyState='No results'
            />
          </div>
        );
    }

    renderPartner(opportunity) {
      if(opportunity.partner) {
        return (
          <Link className="LoginForm-helpText" classic to={`/scorecard/${opportunity.partner__c}/opportunities`}>{opportunity.partner}</Link>
        )
      }
      return null;
    }
    renderDateTime(opportunity) {
      if(opportunity.meeting_date_time__c) {
        return (
            <Moment unix format="ddd MMM DD, YYYY hh:mm a">{opportunity.meeting_date_time__c}</Moment>
        )
      }
      return null;
    }
}

export default connect()(Opportunities);
