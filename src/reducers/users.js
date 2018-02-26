import { FETCHING_USERS, FETCH_USERS_SUCCESS } from 'actions/users';
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
  let fetched = usersList.getMeta('fetched');
  switch (action.type) {
    case FETCHING_USERS:
      return usersList.setMeta('fetched', fetched.push('*'));
    case FETCH_USERS_SUCCESS:
      usersList = usersList.setMeta('fetched', usersList.getMeta('fetched'));
      if (action.payload && action.payload.users) {
        usersList = usersList.saveAll(action.payload.users);
      }
      return usersList;
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
