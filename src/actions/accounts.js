import API from 'util/API';
import { receivedNormalAPIResponse } from 'actions/api';

export const FETCH_ACCOUNT_SUCCESS = 'FETCH_ACCOUNT_SUCCESS';
export const FETCHING_ACCOUNT = 'FETCHING_ACCOUNT';

export function fetchAccount(id) {
  console.log('fetchAccount: ' + id);
  return (dispatch, getState) => {
    let key = `id:${id}`;
    if(id) {
      dispatch(fetchingAccount(key));
      return API.get(`accounts/${id}`)
        .then((res) => dispatch(receivedNormalAPIResponse(res)))
        .then(() => dispatch(fetchAccountSuccess(key)));
    }
  }
}

export function fetchingAccount() {
  return {
    type: FETCHING_ACCOUNT
  };
}

export function fetchAccountSuccess(key) {
  return {
    type: FETCH_ACCOUNT_SUCCESS,
    key: key
  };
}
