import React from 'react';
import { connect } from 'react-redux';
import App from 'components/App';
import CampaignDashboard from 'components/campaigns/dashboard';
import FetchCampaign from 'containers/fetchers/fetch_campaign';

function CampaignsPage ({ user, ...props }) {
  return <App {...props}><CampaignDashboard {...props} /></App>
}

const mapStateToProps = (state, props) => ({
  user: state.authentication.user,
  campaignId: props.params.campaignId
});

export default connect(mapStateToProps)(CampaignsPage);
