import React, { Component } from 'react';
import Link from 'components/link';
import Icon from 'components/icon';
import SGButton from 'components/shared/button/button';
import UsersListRow from './usersListRow';
import '../css/admin.scss';
import './Users.scss';
import * as Sort from 'util/sort';

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.state = {
      ascending: true
    };
  }

  sort(a, b) {
    return Sort.byName(a, b, this.state.ascending);
  }

  render() {
    var handleSort;
    let users = this.props.users;
    let showSort = users.length > 1;
    if(showSort) {
      handleSort = () => {Sort.handleSort(this)};
    }
    return (
      <div className="ContentWrapper ContentWrapper--admin">
        <Link blue to='/'>
          <Icon className='Enrollment-headerIcon' type='chevron' left inline encircled interactive={false}/>
          <span className="Enrollment-headerLabel">Back to Dashboard</span>
        </Link>
        <div className="Container Container--padded">
          <h2 className="Admin-title">Admin Users</h2>
          <div className="Admin-subtitle SGButton--container">
            <Link to="/admin/admins/new">
              <SGButton buttonText="Add New" />
            </Link>
          </div>
          <table className="SG-Admin--ListTable">
          <thead>
            <tr className="SG-Admin--ListRow SG-Admin--ListHeader">
                <th className="UserListCell UserListCell-lname">
                  Last Name
                  {showSort && Sort.renderIcon(this.state.ascending, handleSort, "UserListCell-sort")}
                </th>
                <th className="UserListCell UserListCell-fname">First Name</th>
                <th className="UserListCell UserListCell-email">Email</th>
                <th className="UserListCell UserListCell-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
          {users && users.sort(this.sort).map((u) => {
            return (
              <UsersListRow
                key={u.id}
                id={u.id}
                firstName={u.firstName}
                lastName={u.lastName}
                email={u.email}
                onDelete={this.props.onDelete}
              />
            );
          })}
          </tbody>
          </table>
        </div>
      </div>
    );
  }
}
