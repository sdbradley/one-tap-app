import React from 'react';
import { connect } from 'react-redux';
import AdminUserDetail from 'components/admin/users/userDetail';
import { createUser, updateUser } from 'actions/users';
import FetchRoles from 'containers/fetchers/fetch_roles';
import { ROLE } from 'constants';

function AdminUserDetailContainer(props) {
  return <FetchRoles><AdminUserDetail {...props} /></FetchRoles>;
}

const mapStateToProps = (state, ownProps) => ({
  user: state.users.find(ownProps.params.user_id, {}),
  roles: state.roles.all(),
  role: state.roles.findOneWhere({ name: ROLE.ADMIN })
})

const mapDispatchToProps = {
  onCreate: createUser,
  onUpdate: updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserDetailContainer);
