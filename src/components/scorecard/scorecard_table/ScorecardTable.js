import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "components/table";
import Link from "components/link";
import jinqJs from "jinq";
import { APP_ROOT } from "constants";
import { STAGE } from "constants";
import FetchOpportunities from "containers/fetchers/fetch_opportunities";
import { setPrecision } from "util/funcs";

class ScorecardTable extends Component {
  constructor(props) {
    super(props);
    this.getScorecardTotal = this.getScorecardTotal.bind(this);
    this.getScorecardValue = this.getScorecardValue.bind(this);
    this.getPartnerPercentage = this.getPartnerPercentage.bind(this);
    this.getScorecardData = this.getScorecardData.bind(this);
    this.getScorecardUpcoming = this.getScorecardUpcoming.bind(this);
    this.getScorecardOccurred = this.getScorecardOccurred.bind(this);
    this.getScorecardNextStepsEstablished = this.getScorecardNextStepsEstablished.bind(
      this
    );
    this.getScorecardOnSiteMeetingSet = this.getScorecardOnSiteMeetingSet.bind(
      this
    );
    this.getScorecardProposalPriceQuote = this.getScorecardProposalPriceQuote.bind(
      this
    );
    this.getScorecardClosedWon = this.getScorecardClosedWon.bind(this);
    this.renderAccount = this.renderAccount.bind(this);
  }

  render() {
    return (
      <FetchOpportunities campaignId={this.props.campaignId}>
        <div className="ScorecardTable">
          <Table
            className="ScorecardTable-table"
            columns={[
              {
                name: "Partner",
                property: "account",
                className: "ScorecardTable-account",
                renderer: this.renderAccount
              },
              {
                name: "Upcoming",
                property: "account",
                renderer: this.getScorecardUpcoming
              },
              {
                name: "Occurred",
                property: "account",
                renderer: this.getScorecardOccurred
              },
              {
                name: "Next Steps",
                property: "account",
                renderer: this.getScorecardNextStepsEstablished
              },
              {
                name: "On-Site",
                property: "account",
                renderer: this.getScorecardOnSiteMeetingSet
              },
              {
                name: "Proposal",
                property: "account",
                renderer: this.getScorecardProposalPriceQuote
              },
              {
                name: "Closed Won",
                property: "account",
                renderer: this.getScorecardClosedWon
              },
              {
                name: "Conv. %",
                property: "account",
                renderer: this.getPartnerPercentage
              }
            ]}
            data={this.getScorecardData()}
            emptyState="No results"
          />
        </div>
      </FetchOpportunities>
    );
  }
  getScorecardData() {
    var result = new jinqJs()
      .from(this.props.data)
      .distinct("name", "partner__c")
      .select("name", "partner__c", "stage_name", "total");
    return result;
  }
  getScorecardUpcoming(account) {
    if (!account.partner__c) {
      return (
        <div>{this.getScorecardValue(account.partner__c, STAGE.UPCOMING)}</div>
      );
    } else {
      return (
        <Link
          classic
          hard
          to={`${APP_ROOT}account/${
            account.partner__c
          }/opportunities?campaign_id=${this.props.campaignId}&stage_name=${
            STAGE.UPCOMING
          }`}
        >
          {this.getScorecardValue(account.partner__c, STAGE.UPCOMING)}
        </Link>
      );
    }
  }
  getScorecardOccurred(account) {
    if (!account.partner__c) {
      return (
        <div>{this.getScorecardValue(account.partner__c, STAGE.OCCURRED)}</div>
      );
    } else {
      return (
        <Link
          classic
          hard
          to={`${APP_ROOT}account/${
            account.partner__c
          }/opportunities?campaign_id=${this.props.campaignId}&stage_name=${
            STAGE.OCCURRED
          }`}
        >
          {this.getScorecardValue(account.partner__c, STAGE.OCCURRED)}
        </Link>
      );
    }
  }
  getScorecardNextStepsEstablished(account) {
    if (!account.partner__c) {
      return (
        <div>
          {this.getScorecardValue(account.partner__c, STAGE.NEXT_STEPS)}
        </div>
      );
    } else {
      return (
        <Link
          classic
          hard
          to={`${APP_ROOT}account/${
            account.partner__c
          }/opportunities?campaign_id=${this.props.campaignId}&stage_name=${
            STAGE.NEXT_STEPS
          }`}
        >
          {this.getScorecardValue(account.partner__c, STAGE.NEXT_STEPS)}
        </Link>
      );
    }
  }
  getScorecardOnSiteMeetingSet(account) {
    if (!account.partner__c) {
      return (
        <div>{this.getScorecardValue(account.partner__c, STAGE.ON_SITE)}</div>
      );
    } else {
      return (
        <Link
          classic
          hard
          to={`${APP_ROOT}account/${
            account.partner__c
          }/opportunities?campaign_id=${this.props.campaignId}&stage_name=${
            STAGE.ON_SITE
          }`}
        >
          {this.getScorecardValue(account.partner__c, STAGE.ON_SITE)}
        </Link>
      );
    }
  }
  getScorecardProposalPriceQuote(account) {
    if (!account.partner__c) {
      return (
        <div>{this.getScorecardValue(account.partner__c, STAGE.PROPOSAL)}</div>
      );
    } else {
      return (
        <Link
          classic
          hard
          to={`${APP_ROOT}account/${
            account.partner__c
          }/opportunities?campaign_id=${this.props.campaignId}&stage_name=${
            STAGE.PROPOSAL
          }`}
        >
          {this.getScorecardValue(account.partner__c, STAGE.PROPOSAL)}
        </Link>
      );
    }
  }
  getScorecardClosedWon(account) {
    if (!account.partner__c) {
      return (
        <div>{this.getScorecardValue(account.partner__c, STAGE.CLOSED)}</div>
      );
    } else {
      return (
        <Link
          classic
          hard
          to={`${APP_ROOT}account/${
            account.partner__c
          }/opportunities?campaign_id=${this.props.campaignId}&stage_name=${
            STAGE.CLOSED
          }`}
        >
          {this.getScorecardValue(account.partner__c, STAGE.CLOSED)}
        </Link>
      );
    }
  }
  getScorecardValue(partner__c, key) {
    var result = new jinqJs()
      .from(this.props.data)
      .distinct("partner__c", "stage_name", "total")
      .where(function(row, index) {
        return row.stage_name === key && row.partner__c === partner__c;
      })
      .select();
    return result[0] ? result[0].total : 0;
  }
  getScorecardTotal(account) {
    var result = new jinqJs()
      .from(this.props.data)
      .distinct("partner__c", "stage_name", "total")
      .where(function(row, index) {
        return row.partner__c === account.partner__c;
      })
      .select();
    return result[0] ? result[0].total : 0;
  }
  getPartnerPercentage(account) {
    var won = this.getScorecardValue(account.partner__c, STAGE.CLOSED);
    var proposal = this.getScorecardValue(account.partner__c, STAGE.PROPOSAL);
    var onsite = this.getScorecardValue(account.partner__c, STAGE.ON_SITE);
    var nextsteps = this.getScorecardValue(
      account.partner__c,
      STAGE.NEXT_STEPS
    );
    var occurred = this.getScorecardValue(account.partner__c, STAGE.OCCURRED);
    var upcoming = this.getScorecardValue(account.partner__c, STAGE.UPCOMING);
    var stage_total = won + proposal + onsite + nextsteps + occurred;
    var total = stage_total + upcoming;
    var pct = total > 0 ? setPrecision((stage_total / total) * 100, 1) : 0;
    return <div>{pct}%</div>;
  }
  renderAccount(account) {
    return (
      <Link
        classic
        hard
        to={`${APP_ROOT}account/${
          account.partner__c
        }/opportunities?campaign_id=${this.props.campaignId}`}
      >
        {account.name}
      </Link>
    );
  }
}

export default connect()(ScorecardTable);
