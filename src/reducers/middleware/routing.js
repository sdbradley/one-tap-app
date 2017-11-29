import changeRoute from 'util/changeRoute';
import Cookies from 'cookies-js';
import {
  ADMIN_CREATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_SUCCESS
} from 'actions/users';

import {
  AUTHENTICATION_LOGOUT,
  AUTHENTICATION_INACTIVITY_WARNING
} from 'actions/authentication';

import { viewModal } from 'actions/modal';

import { ROLE } from 'constants';

export default store => next => action => {
  switch (action.type) { // eslint-disable-line default-case
    case ADMIN_CREATE_USER_SUCCESS:
      // falls through
    case ADMIN_UPDATE_USER_SUCCESS:
      let role = action.payload.user.roles[0].name;
      if (role === ROLE.TEACHER) {
        changeRoute(`/admin/schools/${action.schoolId}/teachers`);
      } else if (role === ROLE.ADMIN) {
        changeRoute('/admin/users');
      } else {
        changeRoute('/admin/students');
      }
      break;

    case AUTHENTICATION_LOGOUT:
      let slug = Cookies.get('slug') || '';
      changeRoute(`/login/${slug}`);
      break;

    // MODALS
    case AUTHENTICATION_INACTIVITY_WARNING:
      store.dispatch(viewModal('inactivityWarning'));
      break;
  }

  next(action);
}
