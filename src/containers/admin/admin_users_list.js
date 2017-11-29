import { connect } from 'react-redux';
import UsersList from 'components/admin/users/usersList';
import { deleteUser } from 'actions/users';
import { ROLE } from 'constants';

export default connect(
  state => ({
    users: state.users.findWhere(user => user.hasRole(ROLE.ADMIN))
  }),
  { onDelete: deleteUser }
)(UsersList);
