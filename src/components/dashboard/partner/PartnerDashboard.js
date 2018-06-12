import React, { Component } from 'react';
import { connect } from 'react-redux';
import FetchOpportunities from 'containers/fetchers/fetch_opportunities';
import FetchCampaigns from 'containers/fetchers/fetch_campaigns';
import FetchStatistics from 'containers/fetchers/fetch_statistics';
import FetchCampaignNews from 'containers/fetchers/fetch_campaign_news';
import FetchAccount from 'containers/fetchers/fetch_account';
import Field from 'components/field';
import Widget from 'components/widget';
import Link from 'components/link';
import Opportunities from 'components/opportunities';
import Campaigns from 'components/campaigns';
import Statistics from 'components/statistics';
import CampaignNews from 'components/campaign_news';
import Account from 'components/dashboard/account';
import { changeStartDate, changeEndDate, setPartner } from 'actions/navigation';
import changeRoute from 'util/changeRoute';
import { ROLE } from 'constants';

class PartnerDashboard extends Component {

  constructor(props, ownProps) {
    super(props);
    this.state = {
      title: '',
      sort: ''
    }
    this.startDateChanged = this.startDateChanged.bind(this);
    this.endDateChanged = this.endDateChanged.bind(this);
  }

  componentWillMount() {
    this.checkForPermissions();
  }
  componentWillUpdate() {
    this.checkForPermissions();
  }
  checkForPermissions() {
    if(this.props.user.hasRole(ROLE.STAKEHOLDER) && (this.props.location.query.partner_id == undefined)) {
      changeRoute("/stakeholder");
    }
  }
  componentDidMount() {
    if(this.props.partner_id) {
      this.props.dispatch(setPartner(this.props.partner_id));
    }
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
          <div className="Widget-half">
            <FetchAccount accountId={this.props.partner_id}>
              <Account accountId={this.props.partner_id} />
            </FetchAccount>
          </div>
          <div className="Widget-half Dashboard-date--container">
            <Field
              type='date'
              name='start_date'
              label='Start Date'
              placeholder='mm/dd/yyyy'
              className="Dashboard-date"
              value={this.props.start_date*1000}
              onChange={this.startDateChanged}
            />
            <Field
              type='date'
              name='end_date'
              label='End Date'
              placeholder='mm/dd/yyyy'
              className="Dashboard-date"
              value={this.props.end_date*1000}
              onChange={this.endDateChanged}
            />
          </div>
        </div>
        <div className="Widget-full">
          <div className="Widget-half">
            <FetchStatistics partner_id={this.props.partner_id} start_date={this.props.start_date} end_date={this.props.end_date}>
              <Widget title="Campaign Statistics">
                <Statistics data={this.props.statistics} />
              </Widget>
            </FetchStatistics>
          </div>
          <div className="Widget-half">
            <FetchCampaignNews partner_id={this.props.partner_id} start_date={this.props.start_date} end_date={this.props.end_date}>
              <Widget title="Campaign News">
                <CampaignNews data={this.props.campaign_news} />
              </Widget>
            </FetchCampaignNews>
          </div>
        </div>
        <div className="Widget-full">
          <FetchOpportunities partner_id={this.props.partner_id} stage={this.props.stage} start_date={this.props.start_date} end_date={this.props.end_date}>
              <Widget title="Upcoming Opportunities">
                <Opportunities data={this.props.opportunities} />
              </Widget>
            </FetchOpportunities>
        </div>
      </div>
    )
  }
}

export default connect(
  (state, props) => {
    let user = state.authentication.user;
    let accountId = (user && user.accountId);
    let partner_id = props.location.query.partner_id;
    let opportunities = state.opportunities.findWhere(o => o.partner__c===partner_id)
    let statistics = state.statistics.all();
    let campaign_news = state.campaign_news.all();
    let campaigns = state.campaigns.all();
    return {
      user: user,
      opportunities: opportunities,
      campaigns: campaigns,
      statistics: statistics,
      campaign_news: campaign_news,
      partner_id: ((partner_id === undefined) ? accountId : partner_id),
      stage: 'Upcoming',
      start_date: state.navigation && state.navigation.startDate,
      end_date: state.navigation && state.navigation.endDate
    };
  },
  { changeStartDate, changeEndDate }
)(PartnerDashboard);
