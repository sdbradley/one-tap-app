import React from 'react';
import { connect } from 'react-redux';
import Users from 'components/admin/users';
import FetchUsers from 'containers/fetchers/fetch_users';

function UsersPage ({ user, ...props }) {
  return <FetchUsers><Users {...props} /></FetchUsers>
}

const mapStateToProps = (state) => ({
  user: state.authentication.user
});

export default connect(mapStateToProps)(UsersPage);
