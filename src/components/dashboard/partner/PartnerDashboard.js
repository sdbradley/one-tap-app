import React, { Component } from 'react';
import { connect } from 'react-redux';
import FetchOpportunities from 'containers/fetchers/fetch_opportunities';
import FetchStatistics from 'containers/fetchers/fetch_statistics';
import FetchCampaignNews from 'containers/fetchers/fetch_campaign_news';
import Widget from 'components/widget';
import Opportunities from 'components/opportunities';
import Statistics from 'components/statistics';
import CampaignNews from 'components/campaign_news';

class PartnerDashboard extends Component {

  render() {
    return (
      <div>
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
  renderLastName(row, position) {
    return (
      <Link to={`/admin/students/${row.id}/enrollments`} blue>{row.lastName}</Link>
    );
  }
}

export default connect(
  (state, props) => {
    let opportunities = state.opportunities.all();
    let statistics = state.statistics.all();
    let campaign_news = state.campaign_news.all();
    let user = state.authentication.user;
    let accountId = user && user.accountId;
    return {
      opportunities: opportunities,
      statistics: statistics,
      campaign_news: campaign_news,
      partner_id: accountId,
      stage: 'Upcoming',
      start_date: 1506834000,
      end_date: 1612139600
    };
  }
)(PartnerDashboard);
