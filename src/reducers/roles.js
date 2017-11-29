import {
  ADMIN_FETCHING_ROLES,
  ADMIN_FETCH_ROLES_SUCCESS
} from 'actions/roles';
import EntityCollection from 'util/EntityCollection';

const INITIAL_STATE = EntityCollection();

const roles = (rolesList = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADMIN_FETCHING_ROLES:
      return rolesList.setMeta('needsToFetch', false);
    case ADMIN_FETCH_ROLES_SUCCESS:
      return rolesList
        .setMeta('needsToFetch', false)
        .clear()
        .saveAll(action.payload.roles);
    default:
      return rolesList;
  }
}

export default roles;
