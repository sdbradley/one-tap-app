import API from 'util/API';
import { receivedNormalAPIResponse } from 'actions/api';

export const FETCHING_USERS = 'FETCHING_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const SET_PASSWORD_SUCCESS = 'SET_PASSWORD_SUCCESS'

export function fetchUsers() {
  return (dispatch, getState) => {
    dispatch(fetchingUsers());
    let url = `admin/users`;
    return API.get(url)
      .then((res) => dispatch(receivedNormalAPIResponse(res)))
      .then(() => dispatch(fetchUsersSuccess()));
  }
}

export function fetchingUsers() {
  return {
    type: FETCHING_USERS
  };
}

export function fetchUsersSuccess() {
  return {
    type: FETCH_USERS_SUCCESS
  };
}

export function createUser({
  first_name,
  last_name,
  email_address,
  user_name,
  account_id
}) {
  if (!first_name || !last_name || !email_address || !user_name || !account_id) {
    throw new Error('All fields are required');
  }

  return (dispatch, getState) => API.admin.post(
    `users`,
    {
      first_name,
      last_name,
      email_address,
      user_name,
      account_id
    }
  )
  .then(res => dispatch({ type: USER_CREATE_SUCCESS, user: [{ 
    first_name, 
    last_name, 
    email_address, 
    user_name, 
    account_id 
  }] }));
}

export function updateUser({
  user_id,
  first_name,
  last_name,
  email_address,
  user_name,
  account_id
}) {
  if (!first_name || !last_name || !email_address || !user_name || !account_id) {
    throw new Error('All fields are required');
  }

  return (dispatch, getState) => API.admin.put(
    `users/${user_id}`,
    {
      first_name,
      last_name,
      email_address,
      user_name,
      account_id
    })
    .then(res => dispatch({ type: USER_UPDATE_SUCCESS, user: [{ 
      first_name, 
      last_name, 
      email_address, 
      user_name, 
      account_id 
    }] }));
}

export function deleteUser(user_id) {
  return (dispatch, getState) => API.admin.delete(`users/${user_id}`)
    .then(() => dispatch(deleteUserSuccess(user_id)));
}

function deleteUserSuccess(userId) {
  return {
    type: DELETE_USER_SUCCESS,
    userId
  };
}

export function setPassword({ id, email, password }) {
  return dispatch =>
    API.put(`/users/${id}`, {
        email,
        password
      })
      .then(res => {
        dispatch({ type: SET_PASSWORD_SUCCESS })
        dispatch(receivedNormalAPIResponse(res))
      })
      .catch(err => {
        if (err.status === 422) {
          throw new Error('Please meet the password criteria above.')
        }
        throw new Error('Server error. Try again later.')
      })
}
