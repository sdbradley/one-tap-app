import React, { Component } from 'react';
import { connect } from 'react-redux';
import FetchScorecard from 'containers/fetchers/fetch_scorecard';
import ScorecardTable from 'components/scorecard/scorecard_table';
import Scorecard from 'components/scorecard';
import ConversionRateChart from 'components/charts/conversion_rate';
import PipelineCalculator from 'components/scorecard/pipeline_calculator';
import Field from 'components/field';
import Widget from 'components/widget';
import { changeStartDate, changeEndDate } from 'actions/navigation';

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
          <div className="Widget-half"></div>
          <div className="Widget-half Dashboard-date--container">
            <Field
              type='date'
              name='start_date'
              label='Start Date'
              placeholder='mm/dd/yyyy'
              className="Dashboard-date"
              value={this.props.start_date && this.props.start_date*1000}
              onChange={this.startDateChanged}
            />
            <Field
              type='date'
              name='end_date'
              label='End Date'
              placeholder='mm/dd/yyyy'
              className="Dashboard-date"
              value={this.props.end_date && this.props.end_date*1000}
              onChange={this.endDateChanged}
            />
          </div>
        </div>
        <div className="Widget-full">
          <Widget title="Scorecard">
            <Scorecard data={this.props.scorecard} />
          </Widget>
        </div>
        <div className="Widget-full">
          <FetchScorecard partner_id={this.props.partner_id} start_date={this.props.start_date} end_date={this.props.end_date}>
            <Widget title="Partner Scorecard">
              <ScorecardTable data={this.props.scorecard} />
            </Widget>
          </FetchScorecard>
        </div>
        <div className="Widget-full">
          <div className="Widget-half">
            <Widget title="Partner Conversion Rates">
              <ConversionRateChart data={this.props.scorecard} />
            </Widget>
          </div>
          <div className="Widget-half">
            <Widget title="Pipeline Calculator">
              <PipelineCalculator data={this.props.scorecard} />
            </Widget>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state, props) => {
    let user = state.authentication.user;
    let accountId = user && user.accountId;
    return {
      partner_id: accountId,
      scorecard: state.scorecard.all(),
      opportunities: state.opportunities.all(),
      start_date: state.navigation && state.navigation.startDate,
      end_date: state.navigation && state.navigation.endDate
    };
  },
  { changeStartDate, changeEndDate }
)(PartnerScorecard);
