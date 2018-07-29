import React, { Component } from "react";
import { connect } from "react-redux";
import FetchAccountOpportunities from "containers/fetchers/fetch_account_opportunities";
import Field from "components/field";
import Widget from "components/widget";
import Table from "components/table";
import Icon from "components/icon";
import Link from "components/link";
import Moment from "react-moment";
import "moment-timezone";

class PartnerOpportunities extends Component {
  render() {
    return (
      <div>
        <div className="Widget-full">
          <FetchAccountOpportunities
            accountId={this.props.accountId}
            campaignId={this.props.campaignId}
            stage={this.props.stage}
          >
            <Widget title="Partner Opportunity Detail">
              <div className="PartnerOpportunityTable">
                <Table
                  className="PartnerOpportunityTable-table"
                  columns={[
                    {
                      name: "Account",
                      className: "PartnerOpportunities-account",
                      renderer: this.renderAccount
                    },
                    { name: "Meeting Time", renderer: this.renderMeetingTime },
                    { name: "Status", property: "stage_name" },
                    { name: "Feedback", renderer: this.renderFeedback },
                    {
                      name: "Deal Registered",
                      renderer: this.renderDealRegistered
                    },
                    {
                      name: "Recording Downloaded",
                      renderer: this.renderDownloadDate
                    }
                  ]}
                  data={this.props.opportunities}
                  emptyState="No results"
                />
              </div>
            </Widget>
          </FetchAccountOpportunities>
        </div>
      </div>
    );
  }

  renderAccount(opportunity) {
    if (opportunity) {
      return (
        <Link
          classic
          to={`/account/${opportunity.account_id}/opportunities/${
            opportunity.id
          }/datasheet`}
        >
          {opportunity.name}
        </Link>
      );
    }
    return null;
  }

  renderMeetingTime(opp) {
    if (opp.meeting_date_time__c) {
      return (
        <div>
          <Moment format="ddd MMM DD, YYYY hh:mm a z" tz="America/New_York">
            {opp.meeting_date_time__c}
          </Moment>
        </div>
      );
    }
    return null;
  }

  renderDownloadDate(opp) {
    if (opp.recording_downloaded_date && opp.recording_downloaded_date > 0) {
      return (
        <div>
          <Icon className="Checkbox-check" type="check" interactive={false} />
        </div>
      );
    }
    return null;
  }

  renderFeedback(opportunity) {
    if (opportunity && opportunity.feedback) {
      return (
        <div key={opportunity.id}>
          {opportunity.feedback.map(f => {
            return <div key={f.id}>{f.feedback}</div>;
          })}
          <Link
            className="PartnerOpportunities-feedback"
            classic
            modal="feedback"
            opportunityId={opportunity.id}
          >
            Leave Feedback
          </Link>
        </div>
      );
    }
    return (
      <Link
        className="PartnerOpportunities-feedback"
        classic
        modal="feedback"
        opportunityId={opportunity.id}
      >
        Leave Feedback
      </Link>
    );
  }

  renderDealRegistered(opp) {
    if (opp.is_won && opp.is_won === "true" && opp.registered_deal_num__c) {
      return (
        <div>
          <Icon className="Checkbox-check" type="check" interactive={false} />
        </div>
      );
    }
  }
}

export default connect((state, props) => {
  let accountId = props.params.accountId;
  let campaignId = props.location.query.campaign_id;
  let stage = props.location.query.stage_name;
  let opportunities = [];
  if (stage) {
    opportunities = state.opportunities.findWhere(
      o =>
        o.partner_account_assigned__c === accountId &&
        (stage && o.stage_name === stage)
    );
  } else {
    opportunities = state.opportunities.findWhere(
      o => o.partner_account_assigned__c === accountId
    );
  }
  return {
    accountId: accountId,
    campaignId: campaignId,
    opportunities: opportunities
  };
})(PartnerOpportunities);
