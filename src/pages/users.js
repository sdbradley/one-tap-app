import React from 'react';
import { connect } from 'react-redux';
import Users from 'components/admin/users';

function UsersPage ({ user, ...props }) {
  return <Users {...props} />
}

export default connect(
  state => ({
    user: state.authentication.user
  })
)(UsersPage)
