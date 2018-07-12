import React from 'react';
import { connect } from 'react-redux';
import Modal from 'containers/modal';
import Field from 'components/field';
import Button from 'components/shared/button';
import Form from 'components/Form';
import FetchAccounts from 'containers/fetchers/fetch_accounts';

import {
  createUser,
  USER_CREATE_SUCCESS,
  updateUser,
  USER_UPDATE_SUCCESS
} from 'actions/users';

function EditUser({
  user,
  accounts,
  updateUser,
  createUser
} = {}) {
  return (
    <FetchAccounts onlyOTPClients={true}>
        <Modal closeAction={user ? USER_UPDATE_SUCCESS : USER_CREATE_SUCCESS}>
            <div className='EditUser'>
            <Form className='EditUser-form' onSubmit={user ? updateUser : createUser}>
                <h1 className='EditUser-title'>{user ? 'Edit' : 'Add'} User</h1>
                { user ? <Field type='hidden' name='user_id' value={user.id} /> : null}
                <Field
                type='text'
                name='first_name'
                label='First name'
                value={user && user.first_name}
                />
                <Field
                type='text'
                name='last_name'
                label='Last name'
                value={user && user.last_name}
                />
                <Field
                type='text'
                name='email_address'
                label='Email'
                value={user && user.email_address}
                />
                <Field
                type='text'
                name='user_name'
                label='Username'
                value={user && user.user_name}
                />
                <Field
                type='select'
                label='Account'
                name='account_id'
                value={user && user.account_id}
                >
                {accounts.map(a => <option key={a.id} value={a.id} label={a.name}/>)}
                </Field>
                <Field type='checkbox' name='is_stakeholder' value={true}>Stakeholder</Field>
                <Field type='checkbox' name='is_admin' value={true}>Admin</Field>
                <Button full submit>{user ? 'Save' : 'Add'}</Button>
            </Form>
            </div>
        </Modal>
    </FetchAccounts>
  );
}

export default connect(
  // Map state to props
  (state, props) => {
    let user = state.users.find(props.userId, null);
    let accounts = state.accounts.all();
    return {
      user,
      accounts
    };
  },
  // Map dispatch to props
  { updateUser, createUser }
)(EditUser);
