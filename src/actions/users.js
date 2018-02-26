import API from 'util/API';
import { receivedNormalAPIResponse } from 'actions/api';

export const FETCHING_USERS = 'FETCHING_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

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
