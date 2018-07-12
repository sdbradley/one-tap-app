import React, { Component } from 'react'
import { connect } from 'react-redux'
import Table from 'components/table'
import Widget from 'components/widget'
import Link from 'components/link'
import Form from 'components/Form'
import Field from 'components/field'
import Button from 'components/shared/button/button'
import { searchUsers } from 'actions/users'

class Users extends Component {

    render() {
      return (
        <div className="Users">
          <Widget title="Users">
            <div className="Widget-full">
              <div className="Widget-half">
                <Form className="Search" onSubmit={this.props.onSearch} errorsOnTop>
                  <Field type="text" label="SEARCH FOR" name="search_term" inline />
                  <Button submit disabled={this.props.searching}>
                    Search
                  </Button>
                </Form>
              </div>
              <div className="Widget-half Widget-right">
                <Link className="Widget-button--right" icon="plus" modal="editUser">Add New User</Link>
              </div>
            </div>
            <Table className="Users-table"
            columns={[
              { name: 'User name', property: 'user_name' },
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
  state => ({
    users: state.users.findAll(state.users.getMeta('searchResults').toArray()),
    searching: state.users.getMeta('searching')
  }),
  { onSearch: searchUsers }
)(Users)
