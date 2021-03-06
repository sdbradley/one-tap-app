import React, { Component } from "react";
import { connect } from "react-redux";
import FetchAccount from "containers/fetchers/fetch_account";
import FetchOpportunity from "containers/fetchers/fetch_opportunity";
import Account from "components/dashboard/account";
import AccountDetail from "components/dashboard/account/detail";
import IntelligenceQuestions from "components/opportunities/datasheet/intelligence_questions";
import CallNotes from "components/opportunities/datasheet/call_notes";
import OpportunityContacts from "components/opportunities/datasheet/opportunity_contacts";
import Attachments from "components/opportunities/datasheet/attachments";
import Moment from "react-moment";
import "moment-timezone";
import Widget from "components/widget";
import { API_LOCATION } from "constants";

class OpportunityDatasheet extends Component {
  render() {
    return (
      <div>
        <FetchAccount accountId={this.props.accountId}>
          <FetchOpportunity opportunityId={this.props.opportunityId}>
            <div className="Widget-full">
              <div className="Widget-half">
                <Widget title="Opportunity Datasheet">
                  <Account accountId={this.props.accountId} />
                  <div>
                    Initial Discovery Call scheduled for:{" "}
                    <Moment format="MM/DD/YYYY hh:mm a z" tz="America/New_York">
                      {this.props.opportunity &&
                        this.props.opportunity.meeting_date_time__c}
                    </Moment>
                  </div>
                </Widget>
              </div>
              <div className="Widget-half">
                <div className="Widget-actions">
                  <div>
                    <a
                      href={`${API_LOCATION}/v2/account/${
                        this.props.accountId
                      }/opportunities/${this.props.opportunity &&
                        this.props.opportunity.id}/print.pdf`}
                      download
                      target="_new"
                    >
                      Export to PDF
                    </a>
                  </div>
                  <div>{this.renderLeadId()}</div>
                </div>
              </div>
              <div className="Widget-full">
                <div className="Widget-half">
                  <Widget title="Company Information">
                    <AccountDetail accountId={this.props.accountId} />
                  </Widget>
                </div>
                <div className="Widget-half">
                  <Widget title="Attachments" className="Attachments-section">
                    <Attachments opportunity={this.props.opportunity} />
                  </Widget>
                </div>
              </div>
              <Widget title="Company Description">
                <div>
                  {this.props.account && this.props.account.description}
                </div>
              </Widget>
              <Widget title="Contacts">
                <OpportunityContacts
                  contacts={
                    this.props.opportunity && this.props.opportunity.contacts
                  }
                />
              </Widget>
              <Widget title="Intelligence Questions">
                <IntelligenceQuestions opportunity={this.props.opportunity} />
              </Widget>
              <Widget title="Call Notes/Additional Comments">
                <CallNotes opportunity={this.props.opportunity} />
              </Widget>
              <Widget title="Action Items">
                On Tap Pipeline will send prospect and partner an email
                confirming the meeting time. 24-48 hours prior to appointment,
                On Tap Pipeline will re-confirm with prospect via email/phone.
              </Widget>
            </div>
          </FetchOpportunity>
        </FetchAccount>
      </div>
    );
  }

  renderLeadId() {
    if (this.props.opportunity && this.props.opportunity.lead_id__c) {
      return <div>Lead ID: {this.props.opportunity.lead_id__c}</div>;
    } else {
      return null;
    }
  }
}

export default connect((state, props) => {
  return {
    accountId: props.params.accountId,
    account: state.accounts.find(props.params.accountId),
    opportunityId: props.params.opportunityId,
    opportunity: state.opportunities.find(props.params.opportunityId),
    start_date: state.navigation && state.navigation.startDate,
    end_date: state.navigation && state.navigation.endDate
  };
})(OpportunityDatasheet);
