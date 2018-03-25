import API from 'util/API';
import { receivedNormalAPIResponse } from 'actions/api';

export const FETCHING_NOTIFICATIONS = 'FETCHING_NOTIFICATIONS';
export const FETCH_NOTIFICATIONS_SUCCESS = 'FETCH_NOTIFICATIONS_SUCCESS';

export function fetchNotifications() {
  return (dispatch, getState) => {
    dispatch(fetchingNotifications());
    let url = `admin/notifications`;
    return API.get(url)
      .then((res) => dispatch(receivedNormalAPIResponse(res)))
      .then(() => dispatch(fetchNotificationsSuccess()));
  }
}

export function fetchingNotifications() {
  console.log('fetchingNotifications');
  return {
    type: FETCHING_NOTIFICATIONS
  };
}

export function fetchNotificationsSuccess() {
  console.log('fetchNotificationsSuccess');
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS
  };
}
