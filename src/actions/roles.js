import { V1 as API } from 'util/API';

export const ADMIN_FETCH_ROLES_SUCCESS = 'ADMIN_FETCH_ROLES_SUCCESS';
export const ADMIN_FETCHING_ROLES = 'ADMIN_FETCHING_ROLES';

export function fetchRoles() {
  return (dispatch, getState) => {
    dispatch(fetchingRoles());
    API.get('roles').then((res) => dispatch(fetchRolesSuccess(res)));
  };
}

export function fetchingRoles() {
  return {
    type: ADMIN_FETCHING_ROLES
  };
}

export function fetchRolesSuccess(roleData) {
  return {
    type: ADMIN_FETCH_ROLES_SUCCESS,
    payload: roleData
  };
}
