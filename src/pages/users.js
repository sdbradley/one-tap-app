import React from 'react';
import { connect } from 'react-redux';
import Users from 'components/admin/users';
import FetchUsers from 'containers/fetchers/fetch_users';
import FetchAccounts from 'containers/fetchers/fetch_accounts';

function UsersPage ({ user, ...props }) {
  return <FetchAccounts><FetchUsers><Users {...props} /></FetchUsers></FetchAccounts>
}

const mapStateToProps = (state) => ({
  user: state.authentication.user
});

export default connect(mapStateToProps)(UsersPage);
