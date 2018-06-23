import React from 'react';
import { connect } from 'react-redux';
import App from 'components/App';
import CampaignDashboard from 'components/campaigns/dashboard';

function CampaignPage ({ user, ...props }) {
  return <App {...props}><CampaignDashboard {...props} /></App>
}

const mapStateToProps = (state, props) => ({
  user: state.authentication.user,
  campaignId: props.params.campaignId
});

export default connect(mapStateToProps)(CampaignPage);
