import { FETCHING_NOTIFICATIONS, FETCH_NOTIFICATIONS_SUCCESS } from 'actions/notifications';
import { RECEIVED_NORMAL_API_RESPONSE } from 'actions/api';
import { List } from 'immutable';
import EntityCollection from 'util/EntityCollection';
import Notification from 'records/Notification';

const INITIAL_STATE = EntityCollection({
  nullEntity: Notification.NULL
}).setMeta({
  fetched: List(),
  searchResults: List()
});

const notifications = (notificationsList = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_NOTIFICATIONS:
    case FETCH_NOTIFICATIONS_SUCCESS:
      return notificationsList.setMeta('fetched', notificationsList.getMeta('fetched').push('*'));
    case RECEIVED_NORMAL_API_RESPONSE:
      if(action.payload && action.payload.notifications){
        return notificationsList.saveAll(action.payload.notifications);
      }
      return notificationsList;
    default:
      return notificationsList;
  }
}

export default notifications;
