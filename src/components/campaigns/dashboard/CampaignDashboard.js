import React, { Component } from 'react';
import { connect } from 'react-redux';
import FetchOpportunities from 'containers/fetchers/fetch_opportunities';
import FetchCampaign from 'containers/fetchers/fetch_campaign';
import FetchStatistics from 'containers/fetchers/fetch_statistics';
import FetchCampaignNews from 'containers/fetchers/fetch_campaign_news';
import Widget from 'components/widget';
import Link from 'components/link';
import Opportunities from 'components/opportunities';
import Campaigns from 'components/campaigns';
import Statistics from 'components/statistics';
import CampaignNews from 'components/campaign_news';
import { APP_ROOT } from 'constants';
import { downloadCSV } from 'actions/campaigns'
import classNames from 'classnames'
import Button from 'components/shared/button/button';
import { setCampaign } from 'actions/navigation';

class CampaignDashboard extends Component {

  constructor(props) {
    super(props)
    this.handleDownload = this.handleDownload.bind(this)
    this.state = {
      downloading: false
    }
  }

  componentDidMount() {
    if(this.props.campaign) {
      this.props.dispatch(setCampaign(this.props.campaign.id));
    }
  }

  handleDownload() {
    if (this.state.downloading || !this.props.campaign) return
    this.setState({ downloading: true }, () =>
      this.props
        .downloadCSV(this.props.campaign.id)
        .catch(e => console.error(e))
        .then(() => this.setState({ downloading: false }))
    )
  }

  render() {
    return (
      <FetchCampaign campaignId={this.props.campaignId}>
        <div>
          <div className="Widget-full">
            <div className="Widget-half">
              <h1 className="Admin-title">{this.props.campaign && this.props.campaign.name}</h1>
            </div>
          </div>
          <div className="Widget-full">
            <div className="Widget-half">
              <Widget title="Campaign Statistics">
                <Statistics data={this.props.campaign} />
              </Widget>
            </div>
            <div className="Widget-half">
              <Widget title="Campaign News">
                <CampaignNews data={this.props.campaign_news} />
              </Widget>
            </div>
          </div>
          <div className="Widget-full">
            <Widget title="Upcoming Opportunities">
              <Opportunities data={this.props.opportunities} />
              {this.renderDownloadLink()}
            </Widget>
          </div>
        </div>
      </FetchCampaign>
    )
  }

  renderDownloadLink() {
    if (this.props.campaign) {
      return <Button className='Gradebook-footerButton' disabled={this.state.downloading} onClick={this.handleDownload}>
        Export to CSV
      </Button>
    }
  }
}

export default connect(
  (state, props) => {
    let user = state.authentication.user;
    let campaign = state.campaigns.findOneWhere(o => o.id===props.campaignId);
    let opportunities = state.opportunities.findWhere(o => o.campaign_id===props.campaignId);
    return {
      user: user,
      campaign: campaign,
      campaign_news: state.campaign_news.all(),
      opportunities: opportunities,
      start_date: state.navigation && state.navigation.startDate,
      end_date: state.navigation && state.navigation.endDate
    };
  },
  { downloadCSV }
)(CampaignDashboard);
