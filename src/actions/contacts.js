import API from "util/API";
import { receivedNormalAPIResponse } from "actions/api";

export const FETCH_CONTACTS_SUCCESS = "FETCH_CONTACTS_SUCCESS";
export const FETCHING_CONTACTS = "FETCHING_CONTACTS";

export function fetchContacts(accountId) {
  return (dispatch, getState) => {
    let key = `account:${accountId}`;
    if (accountId) {
      dispatch(fetchingContacts(key));
      let url = `contacts?account_id=${accountId}`;
      return API.get(url)
        .then(res => dispatch(receivedNormalAPIResponse(res)))
        .then(() => dispatch(fetchContactsSuccess(key)));
    }
  };
}

export function fetchingContacts() {
  return {
    type: FETCHING_CONTACTS
  };
}

export function fetchContactsSuccess(key) {
  return {
    type: FETCH_CONTACTS_SUCCESS,
    key: key
  };
}
