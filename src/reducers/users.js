import { FETCHING_USERS, FETCH_USERS_SUCCESS, USER_CREATE_SUCCESS, USER_UPDATE_SUCCESS, DELETE_USER_SUCCESS } from 'actions/users';
import { RECEIVED_NORMAL_API_RESPONSE } from 'actions/api';
import { List } from 'immutable';
import EntityCollection from 'util/EntityCollection';
import User from 'records/User';

const INITIAL_STATE = EntityCollection({
  nullEntity: User.NULL
}).setMeta({
  fetched: List(),
  searchResults: List()
});

const users = (usersList = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_USERS:
    case FETCH_USERS_SUCCESS:
      return usersList.setMeta('fetched', usersList.getMeta('fetched').push('*'));
    case USER_UPDATE_SUCCESS:
    case USER_CREATE_SUCCESS:
      return usersList.setMeta('fetched', usersList.getMeta('fetched').clear());
    case DELETE_USER_SUCCESS:
      return usersList.delete(action.userId);
    case RECEIVED_NORMAL_API_RESPONSE:
      if(action.payload && action.payload.users){
        return usersList.saveAll(action.payload.users);
      }
      return usersList;
    default:
      return usersList;
  }
}

export default users;
