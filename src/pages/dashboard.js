import React from 'react';
import { connect } from 'react-redux';
import App from 'components/App';
import AdminDashboard from 'components/admin/dashboard';
import PartnerDashboard from 'components/dashboard/partner';
import { RIGHT } from 'constants';

function Dashboard ({ user, ...props }) {
  let content = null;
  if (user.hasRight(RIGHT.ADMIN_DASHBOARD)) {
    content = <AdminDashboard {...props} />;
  } else {
    content = <PartnerDashboard {...props} />;
  }

  return <App {...props}>{content}</App>
}

const mapStateToProps = (state) => ({
  user: state.authentication.user
});

export default connect(mapStateToProps)(Dashboard);
