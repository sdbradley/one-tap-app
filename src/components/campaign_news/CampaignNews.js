import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Moment from 'react-moment';

class CampaignNews extends Component {

    render() {
        return (
          <div className="CampaignNews">
            <Table className="CampaignNews-table"
              columns={[
                { name: 'Item', property: 'body' },
                { name: 'Date', renderer: this.renderDate}
              ]}
              data={this.props.data}
              emptyState='No results'
            />
          </div>
        );
    }

    renderDate(item) {
      if(item.created_at) {
        return (
          <div><Moment format="MM/DD/YYYY">{item.created_at}</Moment></div>
        )
      }
      return null;
    }
}

export default connect()(CampaignNews);
