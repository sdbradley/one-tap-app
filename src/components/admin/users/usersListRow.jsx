import React, { Component } from 'react';
import SGButton from 'components/shared/button/button';
import Link from 'components/link'
import '../css/admin.scss';

export default class UsersListRow extends Component {
  constructor(props) {
    super(props);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  render() {
    return (
      <tr className="SG-Admin--ListRow">
        <td className="UserListCell UserListCell--lname">{this.props.lastName}</td>
        <td className="UserListCell UserListCell--fname">{this.props.firstName}</td>
        <td className="UserListCell UserListCell--email">{this.props.email}</td>
        <td className="SG-Admin--ListCell SG-Admin--ListCell-actions">
          <Link to={`/admin/admins/${this.props.id}`}>
            <SGButton
                classOverride="SGButton--action-sm"
                buttonText="Edit"
            />
          </Link>
          <SGButton
              classOverride="SGButton--action-sm"
              buttonText="Delete"
              onClick={this._handleDeleteClick}
          />
        </td>
      </tr>
    );
  }

  _handleDeleteClick() {
      this.props.onDelete(this.props.id);
  }
}
