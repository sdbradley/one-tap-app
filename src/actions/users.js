import API from 'util/API';
import { receivedNormalAPIResponse } from 'actions/api';

export const FETCHING_USERS = 'FETCHING_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

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
  user_id
}) {
  if (!first_name || !last_name || !email_address) {
    throw new Error('All fields are required');
  }

  return (dispatch, getState) => API.admin.post(
    `users`,
    {
      first_name,
      last_name,
      email_address,
      user_id
    }
  )
    .then(res =>dispatch(receivedNormalAPIResponse(res)))
    .then(() => dispatch(createUserSuccess()));
}

export function updateUser({
  first_name,
  last_name,
  email_address,
  user_id
}) {
  if (!first_name || !last_name || !email_address) {
    throw new Error('All fields are required');
  }

  return (dispatch, getState) => API.admin.put(
    `users/${user_id}`,
    {
      first_name,
      last_name,
      email_address,
      user_id
    })
    .then(res =>dispatch(receivedNormalAPIResponse(res)))
    .then(() => dispatch(updateUserSuccess()));
}

export function deleteUser({
  user_id
}) {

  return (dispatch, getState) => API.admin.delete(`users/${user_id}`)
    .then(() => dispatch(deleteUserSuccess(user_id)));
}

function createUserSuccess(userId, data) {
  return {
    type: USER_CREATE_SUCCESS,
    userId,
    user: data
  };
}

function updateUserSuccess(userId, data) {
  return {
    type: USER_UPDATE_SUCCESS,
    userId,
    user: data
  };
}

function deleteUserSuccess(userId) {
  return {
    type: DELETE_USER_SUCCESS,
    userId
  };
}
