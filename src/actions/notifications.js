import API from 'util/API';
import { receivedNormalAPIResponse } from 'actions/api';

export const FETCHING_NOTIFICATIONS = 'FETCHING_NOTIFICATIONS';
export const FETCH_NOTIFICATIONS_SUCCESS = 'FETCH_NOTIFICATIONS_SUCCESS';
export const RESEND_NOTIFICATION_SUCCESS = 'RESEND_NOTIFICATION_SUCCESS';

export function fetchNotifications() {
  return (dispatch, getState) => {
    dispatch(fetchingNotifications());
    let url = `admin/notifications`;
    return API.get(url)
      .then((res) => dispatch(receivedNormalAPIResponse(res)))
      .then(() => dispatch(fetchNotificationsSuccess()));
  }
}

export function resendNotification({notification_id}) {
  return (dispatch, getState) => API.put(`admin/notifications/${notification_id}`)
    .then(() => dispatch(resendNotificationSuccess(notification_id)));
}

export function fetchingNotifications() {
  return {
    type: FETCHING_NOTIFICATIONS
  };
}

export function fetchNotificationsSuccess() {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS
  };
}

export function resendNotificationSuccess(id) {
  return {
    id: id,
    type: RESEND_NOTIFICATION_SUCCESS
  };
}
