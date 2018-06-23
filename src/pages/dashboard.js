import React from 'react';
import { connect } from 'react-redux';
import App from 'components/App';
import AdminDashboard from 'components/admin/dashboard';
import CampaignDashboard from 'components/campaigns/dashboard';
import { ROLE } from 'constants';
import changeRoute from 'util/changeRoute';

function Dashboard ({ user, ...props }) {
  let content = null;
  content = <CampaignDashboard {...props} />;
  return <App {...props}>{content}</App>
}

const mapStateToProps = (state) => ({
  user: state.authentication.user
});

export default connect(mapStateToProps)(Dashboard);
