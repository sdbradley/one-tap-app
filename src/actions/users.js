import API, { V1 } from 'util/API';
import { CLIENT_LOCATION, ROLE } from 'constants';
import { join } from 'util/path';
import { receivedNormalAPIResponse } from 'actions/api';

// V2
export const RECEIVED_SEARCH_RESULTS = 'RECEIVED_SEARCH_RESULTS';
export const RECEIVED_STUDENTS_FOR_SCHOOL = 'RECEIVED_STUDENTS_FOR_SCHOOL';
export const RECEIVED_TEACHERS_FOR_SCHOOL = 'RECEIVED_TEACHERS_FOR_SCHOOL';
export const RECEIVED_ADMINS = 'RECEIVED_ADMINS';

export function searchStudents(params) {
  // Count query characters
  let count = Object.keys(params).reduce(
    (chars, key) => chars + params[key].length,
    0
  )
  if ( count < 2 ) {
    throw new Error('Must include at least 2 characters in your search query');
  }
  return _searchUsers(params);
}

export function fetchStudentsForSchool(school_id) {
  return (dispatch) => API.Admin.get(`/schools/${school_id}/students`)
    .then(res => {
      dispatch({
        type: RECEIVED_STUDENTS_FOR_SCHOOL,
        school_id
      });
      dispatch(receivedNormalAPIResponse(res));
    })
}

export function fetchTeachersForSchool(school_id) {
  return (dispatch) => API.Admin.get(`/schools/${school_id}/teachers`)
  .then(res => {
    dispatch({
      type: RECEIVED_TEACHERS_FOR_SCHOOL,
      school_id
    });
    dispatch(receivedNormalAPIResponse(res));
  })
}

export function fetchAdmins() {
  return (dispatch) => _fetch({role: ROLE.ADMIN})
  .then(res => {
    dispatch({
      type: RECEIVED_ADMINS
    });
    dispatch(receivedNormalAPIResponse(res));
  }) 
}

function _searchUsers(params) {
  return (dispatch) => _fetch(params)
    .then(res => {
      dispatch({
        type: RECEIVED_SEARCH_RESULTS,
        ids: (res.users || []).map(user => user.id)}
      );
      dispatch(receivedNormalAPIResponse(res));
    });
}

function _fetch(params) {
  return API.Admin.get(`/users${_getQueryString(params)}`);
}

function _getQueryString(params) {
  var query = '?';
  Object.keys(params).forEach( (k, index) => {
    let paramHasValue = params[k] !== '';
    if(paramHasValue && query.length > 1) {
      query += "&"
    }
    query += paramHasValue ? `${k}=${params[k]}` : '';
  });
  return query.length > 1 ? query : '';
}

// V1
export const ADMIN_FETCH_USERS_SUCCESS = 'ADMIN_FETCH_USERS_SUCCESS';
export const ADMIN_FETCHING_USERS = 'ADMIN_FETCHING_USERS';
export const ADMIN_CREATE_USER_SUCCESS = 'ADMIN_CREATE_USER_SUCCESS';
export const ADMIN_UPDATE_USER_SUCCESS = 'ADMIN_UPDATE_USER_SUCCESS';
export const ADMIN_DELETE_USER_SUCCESS = 'ADMIN_DELETE_USER_SUCCESS';
export const CHANGE_STUDENT_PASSWORD_SUCCESS = 'CHANGE_STUDENT_PASSWORD_SUCCESS';

export function createUser(userData) {
  return (dispatch, getState) => V1.post('users', {
    ...userData,
    callback_url: join(CLIENT_LOCATION, 'set-password', encodeURIComponent(userData.user.email), '{token}')
  })
    .then((user) => dispatch(createUserSuccess(user, userData.school_id)));
}

export function updateUser(userData) {
  return (dispatch, getState) => V1.put(`users/${userData.user.id}`, userData)
    .then((user) => dispatch(updateUserSuccess(user, userData.school_id)));
}

export function deleteUser(userId) {
  return (dispatch, getState) => V1.delete(`users/${userId}`)
    .then(() => dispatch(deleteUserSuccess(userId)));
}

export function resetStudentPassword({ id, email, password }) {
  return (dispatch, getState) => API.teacher.put(
    `students/${id}`,
    {
      user: { email, password }
    }
  ).then(() => dispatch({ type: CHANGE_STUDENT_PASSWORD_SUCCESS }));
}

function createUserSuccess(userData, schoolId) {
  return {
    type: ADMIN_CREATE_USER_SUCCESS,
    payload: userData,
    schoolId
  }
}

function updateUserSuccess(userData, schoolId) {
  return {
    type: ADMIN_UPDATE_USER_SUCCESS,
    payload: userData,
    schoolId
  };
}

function deleteUserSuccess(userId) {
  return {
    type: ADMIN_DELETE_USER_SUCCESS,
    userId
  };
}
