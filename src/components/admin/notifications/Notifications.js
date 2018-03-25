import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Widget from 'components/widget';
import Button from 'components/shared/button/button';
import Link from 'components/link';
import Moment from 'react-moment';

class Notifications extends Component {

    render() {
      return (
        <div className="Notifications">
          <Widget title="Notifications">
            <Table className="Notifications-table"
            columns={[
              { name: 'Opportunity', property: 'opportunity' },
              { name: 'Sent', renderer: this.renderDate },
              { name: 'Type', property: 'notification_type' },
              { name: 'Actions', renderer: this.renderActions }
            ]}
            data={this.props.data}
            emptyState='No results'
            />
          </Widget>
        </div>
      );
    }
    renderDate(item) {
        if(item.sent_on) {
          return (
            <div><Moment format="MM/DD/YYYY HH:mm a" unix>{item.sent_on}</Moment></div>
          )
        }
        return null;
      }
    renderActions(item) {
      return (
        <div>
          <Link modal="resendNotification" notificationId={item.id}>Re-Send</Link>
        </div>
      );
    }
}

export default connect(
    (state, props) => {
      let data = state.notifications.all();
      return {
        data: data
      };
    }
  )(Notifications);
