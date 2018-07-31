import React, { Component } from "react";
import { connect } from "react-redux";
import FetchScorecard from "containers/fetchers/fetch_scorecard";
import ScorecardTable from "components/scorecard/scorecard_table";
import Scorecard from "components/scorecard";
import ConversionRateChart from "components/charts/conversion_rate";
import PipelineCalculator from "components/scorecard/pipeline_calculator";
import Field from "components/field";
import Widget from "components/widget";
import { changeStartDate, changeEndDate } from "actions/navigation";
import { STAGE } from "constants";

class PartnerScorecard extends Component {
  constructor(props, ownProps) {
    super(props);
    this.startDateChanged = this.startDateChanged.bind(this);
    this.endDateChanged = this.endDateChanged.bind(this);
  }

  startDateChanged(event) {
    const value = event.value;
    this.props.changeStartDate(value);
  }

  endDateChanged(event) {
    const value = event.value;
    this.props.changeEndDate(value);
  }

  render() {
    return (
      <div>
        <div className="Widget-full">
          <Widget title="Scorecard">
            <Scorecard data={this.props.scorecard} />
          </Widget>
        </div>
        <div className="Widget-full">
          <FetchScorecard
            campaign_id={this.props.campaignId}
            start_date={this.props.start_date}
            end_date={this.props.end_date}
          >
            <Widget title="Partner Scorecard">
              <ScorecardTable
                data={this.props.scorecard}
                opportunities={this.props.opportunities}
                campaignId={this.props.campaignId}
              />
            </Widget>
          </FetchScorecard>
        </div>
        <div className="Widget-full">
          <div className="Widget-half">
            <Widget title="Pipeline Calculator">
              <PipelineCalculator
                data={this.props.scorecard}
                opportunities={this.props.opportunities}
              />
            </Widget>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    let user = state.authentication.user;
    let accountId = user && user.accountId;
    let partner_id = props.location.query.partner_id;
    let campaignId = props.campaignId;
    let scorecard = state.scorecard.all();

    return {
      partner_id: partner_id === undefined ? accountId : partner_id,
      campaignId: campaignId,
      scorecard: scorecard,
      opportunities: state.opportunities.findWhere(
        o => o.campaign_id === campaignId
      ),
      start_date: state.navigation && state.navigation.startDate,
      end_date: state.navigation && state.navigation.endDate
    };
  },
  { changeStartDate, changeEndDate }
)(PartnerScorecard);
