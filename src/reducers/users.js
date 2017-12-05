import {
  ADMIN_FETCHING_USERS,
  ADMIN_FETCH_USERS_SUCCESS,
  ADMIN_CREATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_DELETE_USER_SUCCESS,
  RECEIVED_STUDENTS_FOR_SCHOOL,
  RECEIVED_TEACHERS_FOR_SCHOOL,
  RECEIVED_ADMINS,
  RECEIVED_SEARCH_RESULTS,
  CLEAR_USERS_SEARCH
} from 'actions/users';
import {
  RECEIVED_NORMAL_API_RESPONSE
} from 'actions/api';
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
    // V1
    case ADMIN_FETCHING_USERS:
      return usersList.setMeta('fetched', usersList.getMeta('fetched').push(action.schoolId));
    case ADMIN_CREATE_USER_SUCCESS:
      return usersList.save(User.fromApi(action.payload.user, action.schoolId));
    case ADMIN_UPDATE_USER_SUCCESS:
      return usersList.save(User.fromApi(action.payload.user, action.schoolId));
    case ADMIN_FETCH_USERS_SUCCESS:
      usersList = usersList.setMeta('fetched', usersList.getMeta('fetched').push(action.schoolId));
      if (action.schoolId) {
        usersList = usersList.deleteWhere(user => user.hasSchool(action.schoolId));
      } else {
        usersList = usersList.clear();
      }
      if (action.payload && action.payload.users) {
        usersList = usersList.saveAll(action.payload.users.map(data => User.fromApi(data, action.schoolId)));
      }
      return usersList;
    case ADMIN_DELETE_USER_SUCCESS:
      return usersList.delete(action.userId);
    // V2
    case RECEIVED_STUDENTS_FOR_SCHOOL:
      return usersList.setMeta('fetched', usersList.getMeta('fetched').push(`students_for_school:${action.school_id}`));
    case RECEIVED_TEACHERS_FOR_SCHOOL:
      return usersList.setMeta('fetched', usersList.getMeta('fetched').push(`teachers_for_school:${action.school_id}`));
    case RECEIVED_ADMINS:
      return usersList.setMeta('fetched', usersList.getMeta('fetched').push('admins:all'));
    case RECEIVED_SEARCH_RESULTS:
      return usersList.setMeta('searchResults', List(action.ids));
    case CLEAR_USERS_SEARCH:
      return usersList.setMeta('searchResults', List());
    case RECEIVED_NORMAL_API_RESPONSE:
      if(action.payload && action.payload.users){
        return usersList.saveAll(action.payload.users.map(data => User.fromApi(data, action.payload.school_id)));
      }
      return usersList;
    default:
      return usersList;
  }
}

export default users;
