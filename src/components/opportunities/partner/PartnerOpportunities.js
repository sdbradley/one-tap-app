import React, { Component } from 'react';
import { connect } from 'react-redux';
import FetchOpportunities from 'containers/fetchers/fetch_opportunities';
import Field from 'components/field';
import Widget from 'components/widget';
import Table from 'components/table';
import Icon from 'components/icon';
import Moment from 'react-moment';
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
          <FetchOpportunities partner_id={this.props.partner_id} start_date={this.props.start_date} end_date={this.props.end_date}>
            <Widget title="Partner Opportunity Detail">
              <div className="PartnerOpportunityTable">
                <Table className="PartnerOpportunityTable-table"
                columns={[
                    { name: 'Account', property: 'name' },
                    { name: 'Meeting Time', renderer: this.renderMeetingTime},
                    { name: 'Status', property: 'stage_name'},
                    { name: 'Feedback', property: 'nextsteps'},
                    { name: 'Deal Registered', renderer: this.renderDealRegistered},
                    { name: 'Recording Downloaded', renderer: this.renderDownloadDate}
                ]}
                data={this.props.opportunities}
                emptyState='No results'
                />
            </div>
            </Widget>
          </FetchOpportunities>
        </div>
      </div>
    )
  }

  renderMeetingTime(opp) {
    if(opp.meeting_date_time__c) {
      return (
        <div><Moment unix format="ddd MMM DD, YYYY hh:mm a">{opp.meeting_date_time__c}</Moment></div>
      )
    }
    return null;
  }

  renderDownloadDate(opp) {
    if(opp.recording_downloaded_date && opp.recording_downloaded_date > 0) {
      return (
        <div><Icon className='Checkbox-check' type='check' interactive={false}/></div>
      )
    }
    return null;
  }

  renderDealRegistered(opp) {
    if(opp.is_won && opp.is_won == "true" && opp.registered_deal_num__c) {
      return (
        <div><Icon className='Checkbox-check' type='check' interactive={false}/></div>
      );
    }
    return null;
  }
}

export default connect(
  (state, props) => {
    let user = state.authentication.user;
    return {
      partner_id: props.params.partner_id,
      opportunities: state.opportunities.all(),
      start_date: state.navigation && state.navigation.startDate,
      end_date: state.navigation && state.navigation.endDate
    };
  },
  { changeStartDate, changeEndDate }
)(PartnerScorecard);
