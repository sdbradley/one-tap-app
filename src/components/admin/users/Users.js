import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Widget from 'components/widget';
import Link from 'components/link';

class Users extends Component {

    render() {
      return (
        <div className="Users">
          <Widget title="Users">
            <Link icon='plus' modal="editUser">Add New User</Link>
            <Table className="Users-table"
            columns={[
              { name: 'User name', property: 'user_name' },
              { name: 'Account', renderer: this.renderAccount },
              { name: 'Email', property: 'email_address'},
              { name: 'Actions', renderer: this.renderActions }
            ]}
            data={this.props.users}
            emptyState='No results'
            />
          </Widget>
        </div>
      );
    }
    renderAccount(item) {
      if(item.account) {
        return (
          <div>{item.account.name}</div>
        )
      }
      return null;
    }
    renderActions(item) {
      return (
        <div>
          <Link modal="editUser" userId={item.id}>Edit</Link>
          <Link className="Users-delete" modal="deleteUser" userId={item.id}>Delete</Link>
        </div>
      );
    }
}

export default connect(
    (state, props) => {
      let users = state.users.all();
      return {
        users: users
      };
    }
  )(Users);
