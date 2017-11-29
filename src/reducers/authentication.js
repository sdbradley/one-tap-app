import {
  AUTHENTICATION_NEW_AUTH,
  AUTHENTICATION_FETCH_DATA_SUCCESS,
  AUTHENTICATION_LOGIN_FAILED,
  AUTHENTICATION_LOGIN_SUCCESS,
  AUTHENTICATION_SIGNUP_FAILED,
  AUTHENTICATION_SIGNUP_SUCCESS,
  AUTHENTICATION_FORGOT_PASSWORD_SUCCESS,
  AUTHENTICATION_FORGOT_PASSWORD_FAILED,
  AUTHENTICATION_RESET_PASSWORD_SUCCESS,
  AUTHENTICATION_RESET_PASSWORD_FAILED,
  AUTHENTICATION_VERIFY_EMAIL_SUCCESS,
  AUTHENTICATION_VERIFY_EMAIL_FAILED,
  AUTHENTICATION_SET_MESSAGE,
  AUTHENTICATION_APP_ACTIVITY,
  AUTHENTICATION_LOGOUT
} from 'actions/authentication';

import { Record, List, Map } from 'immutable';
import User from 'records/User';
import Cookies from 'cookies-js';

const Authentication = Record({
  token: null,
  errors: List(),
  authFormErrors: List(),
  authFormSuccess: false,
  message: null,
  user: User.NULL,
  timeout: null
});

const authetication = (auth = Authentication().set('token', Cookies.get("userToken")), action) => {
  switch (action.type) {
    case AUTHENTICATION_LOGIN_FAILED:
      // TODO: This assumption won't always be true, add better error management.
      return auth.set('errors', List(['Email or password is incorrect']));
    case AUTHENTICATION_FETCH_DATA_SUCCESS:
      return auth.set('user', User.fromApi(action.payload.user));
    case AUTHENTICATION_NEW_AUTH:
      return auth.merge({
        authFormErrors: List(),
        authFormSuccess: false
      });
    case AUTHENTICATION_LOGIN_SUCCESS:
      return auth.set('token', action.payload).merge({
        authFormErrors: Map(),
        authFormSuccess: true
      });
    case AUTHENTICATION_SET_MESSAGE:
      return auth.set('message', action.message);
    case AUTHENTICATION_FORGOT_PASSWORD_SUCCESS:
      // falls through
    case AUTHENTICATION_RESET_PASSWORD_SUCCESS:
      // falls through
    case AUTHENTICATION_VERIFY_EMAIL_SUCCESS:
      // falls through
    case AUTHENTICATION_SIGNUP_SUCCESS:
      return auth.merge({
        authFormErrors: List(),
        authFormSuccess: true
      });
    case AUTHENTICATION_FORGOT_PASSWORD_FAILED:
      // falls through
    case AUTHENTICATION_RESET_PASSWORD_FAILED:
      // falls through
    case AUTHENTICATION_VERIFY_EMAIL_FAILED:
      // falls through
    case AUTHENTICATION_SIGNUP_FAILED:
      let authFormErrors = typeof (action.error.message || action.error) === 'string'
        ? List([ action.error.message || action.error ])
        : Map(action.error);
      return auth.merge({
        authFormErrors,
        authFormSuccess: false
      });
    case AUTHENTICATION_LOGOUT:
      clearTimeout(auth.timeout);
      return Authentication();
    case AUTHENTICATION_APP_ACTIVITY:
      clearTimeout(auth.timeout);
      return auth.set('timeout', action.timeout);
    default:
      return auth;
  }
}

export default authetication;
