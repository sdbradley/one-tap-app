import React from 'react';
import { connect } from 'react-redux';
import Notifications from 'components/admin/notifications';
import FetchNotifications from 'containers/fetchers/fetch_notifications';

function NotificationsPage ({ user, ...props }) {
  return <FetchNotifications><Notifications {...props} /></FetchNotifications>
}

const mapStateToProps = (state) => ({
  user: state.authentication.user
});

export default connect(mapStateToProps)(NotificationsPage);
