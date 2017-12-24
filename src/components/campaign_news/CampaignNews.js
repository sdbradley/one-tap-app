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
                { name: 'Date', property: 'created_at'}
              ]}
              data={this.props.data}
              emptyState='No results'
            />
          </div>
        );
    }
}

export default connect()(CampaignNews);
