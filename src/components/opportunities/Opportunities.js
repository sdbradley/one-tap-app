import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "components/table";
import Moment from "react-moment";
import Link from "components/link";
import { APP_ROOT } from "constants";

class Opportunities extends Component {
  render() {
    return (
      <div className="Opportunities">
        <Table
          columns={[
            { name: "Name", renderer: this.renderName },
            { name: "Partner", renderer: this.renderPartner },
            { name: "Stage", property: "stage_name" },
            {
              name: "Meeting Time",
              property: "meeting_date_time__c",
              renderer: this.renderDateTime
            }
          ]}
          data={this.props.data}
          emptyState="No results"
        />
      </div>
    );
  }
  renderName(opportunity) {
    return (
      <Link
        classic
        hard
        to={`${APP_ROOT}account/${opportunity.account_id}/opportunities/${
          opportunity.id
        }/datasheet`}
      >
        {opportunity.name}
      </Link>
    );
  }
  renderPartner(opportunity) {
    if (opportunity.account) {
      return <div>{opportunity.account.name}</div>;
    }
    return null;
  }
  renderDateTime(opportunity) {
    if (opportunity.meeting_date_time__c) {
      return (
        <Moment format="ddd MMM DD, YYYY hh:mm a">
          {opportunity.meeting_date_time__c}
        </Moment>
      );
    }
    return null;
  }
}

export default connect()(Opportunities);
