import React from 'react';
import { connect } from 'react-redux';
import App from 'components/App';
import Campaigns from 'components/campaigns';

function CampaignsPage ({ user, ...props }) {
  return <App {...props}><Campaigns {...props} /></App>
}

const mapStateToProps = (state, props) => ({
  user: state.authentication.user
});

export default connect(mapStateToProps)(CampaignsPage);
