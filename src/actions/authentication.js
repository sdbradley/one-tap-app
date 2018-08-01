import { V2 as API } from "util/API";
import { EMAIL_PATTERN, CLIENT_LOCATION } from "constants";
import { join } from "util/path";
import Cookies from "cookies-js";
import { receivedNormalAPIResponse } from "actions/api";
import changeRoute from "util/changeRoute";

export const AUTHENTICATION_LOGIN_SUCCESS = "AUTHENTICATION_LOGIN_SUCCESS";
export const AUTHENTICATION_LOGIN_FAILED = "AUTHENTICATION_LOGIN_FAILED";
export const AUTHENTICATION_NEW_AUTH = "AUTHENTICATION_NEW_AUTH";
export const AUTHENTICATION_APP_ACTIVITY = "AUTHENTICATION_APP_ACTIVITY";
export const AUTHENTICATION_SIGNUP_SUCCESS = "AUTHENTICATION_SIGNUP_SUCCESS";
export const AUTHENTICATION_SIGNUP_FAILED = "AUTHENTICATION_SIGNUP_FAILED";
export const AUTHENTICATION_FORGOT_PASSWORD_SUCCESS =
  "AUTHENTICATION_FORGOT_PASSWORD_SUCCESS";
export const AUTHENTICATION_FORGOT_PASSWORD_FAILED =
  "AUTHENTICATION_FORGOT_PASSWORD_FAILED";
export const AUTHENTICATION_RESET_PASSWORD_SUCCESS =
  "AUTHENTICATION_RESET_PASSWORD_SUCCESS";
export const AUTHENTICATION_RESET_PASSWORD_FAILED =
  "AUTHENTICATION_RESET_PASSWORD_FAILED";
export const AUTHENTICATION_FETCH_DATA_SUCCESS =
  "AUTHENTICATION_FETCH_DATA_SUCCESS";
export const AUTHENTICATION_VERIFY_EMAIL_SUCCESS =
  "AUTHENTICATION_VERIFY_EMAIL_SUCCESS";
export const AUTHENTICATION_VERIFY_EMAIL_FAILED =
  "AUTHENTICATION_VERIFY_EMAIL_FAILED";
export const AUTHENTICATION_LOGOUT = "AUTHENTICATION_LOGOUT";
export const AUTHENTICATION_INACTIVITY_WARNING =
  "AUTHENTICATION_INACTIVITY_WARNING";
export const AUTHENTICATION_STAY_LOGGED_IN = "AUTHENTICATION_STAY_LOGGED_IN";
export const AUTHENTICATION_SET_MESSAGE = "AUTHENTICATION_SET_MESSAGE";
import { SECONDS_TO_LOGOUT, INACTIVITY_WARNING_DURATION } from "constants";

export function login({ email, password }) {
  if (!email || !password) {
    throw new Error("All fields are required");
  } else if (!EMAIL_PATTERN.test(email)) {
    throw new Error("Must use a valid email");
  }

  return dispatch => {
    API.post("authentication", { email, password }, { accept: "text/plain" })
      .then(token => dispatch(receiveToken(token)))
      .catch(err => {
        if (err.status === 412) changeRoute("force-password");
        dispatch(currentUserLoginFailed(err));
      });
  };
}

function inactivityWarningTimout(dispatch) {
  return setTimeout(() => {
    dispatch({ type: AUTHENTICATION_INACTIVITY_WARNING });
    dispatch(_activity(inactivityLogoutTimeout(dispatch)));
  }, (SECONDS_TO_LOGOUT - INACTIVITY_WARNING_DURATION) * 1000);
}

function inactivityLogoutTimeout(dispatch) {
  return setTimeout(() => {
    dispatch(currentUserLogout());
    dispatch(
      setAuthMessage({
        title: "Login",
        description: "You have been logged out due to inactivity."
      })
    );
  }, INACTIVITY_WARNING_DURATION * 1000);
}

export function activity(token) {
  return (dispatch, getState) =>
    dispatch(
      _activity(
        token || getState().authentication.token
          ? inactivityWarningTimout(dispatch)
          : null
      )
    );
}

export function stayLoggedIn() {
  return dispatch => {
    dispatch({
      type: AUTHENTICATION_STAY_LOGGED_IN
    });

    dispatch(activity(inactivityWarningTimout(dispatch)));
  };
}

function _activity(timeout) {
  return {
    type: AUTHENTICATION_APP_ACTIVITY,
    timeout
  };
}

export function signup({ first_name, last_name, email, password, terms }) {
  if (!terms || terms === "false") {
    throw new Error(
      "You must agree to the Terms and Conditions and the Privacy Policy to continue."
    );
  }
  return dispatch =>
    API.post("public/users", {
      user: {
        first_name,
        last_name,
        email,
        password,
        password_confirmation: password
      },
      callback_url: join(
        CLIENT_LOCATION,
        "verify",
        encodeURIComponent(email),
        "{token}"
      )
    })
      .then(() => dispatch(currentUserSignupSuccess()))
      .catch(response =>
        response
          .json()
          .then(json => dispatch(currentUserSignupFailed(json.errors)))
      );
}

export function currentUserFetchData() {
  return (dispatch, getState) =>
    API.get("users/current").then(user => {
      dispatch(currentUserFetchDataSuccess(user));
      dispatch(receivedNormalAPIResponse(user.user));
    });
}

export function forgotPassword({ email }) {
  return dispatch =>
    API.post("public/users/password_reset", {
      user: { email },
      callback_url: join(
        CLIENT_LOCATION,
        "forgot-password",
        encodeURIComponent(email),
        "{token}"
      )
    })
      .then(() => dispatch(forgotPasswordSuccess()))
      .catch(response =>
        response
          .json()
          .then(json => dispatch(forgotPasswordFailed(json.errors)))
      )
      .catch(response =>
        dispatch(
          forgotPasswordFailed(
            new Error("An error occurred while processing your request.")
          )
        )
      );
}

export function resetPassword({ email, token, password, terms }) {
  if (typeof terms !== "undefined" && (!terms || terms === "false")) {
    throw new Error(
      "You must agree to the Terms and Conditions and the Privacy Policy to continue."
    );
  }
  return dispatch =>
    API.post("public/users/password", {
      user: { email, token, password }
    })
      .then(() => dispatch(resetPasswordSuccess()))
      .catch(response =>
        response.json().then(json => dispatch(resetPasswordFailed(json.errors)))
      )
      .catch(response =>
        dispatch(
          resetPasswordFailed(
            new Error(
              "An error occurred. If you have already created your account, click the link above to return to the Login screen"
            )
          )
        )
      );
}

export function verifyEmail({ email, token }) {
  return dispatch =>
    API.post("public/token/validate", { user: { email, token } })
      .then(() => dispatch(verifyEmailSuccess()))
      .catch(response =>
        dispatch(verifyEmailFailed(new Error("An unknown error occured")))
      );
}

export function receiveToken(token) {
  return dispatch => {
    dispatch(currentUserLoginSuccess(token));
    //dispatch(activity(token));
    dispatch(currentUserFetchData());
  };
}

export function setAuthMessage(message) {
  return {
    type: AUTHENTICATION_SET_MESSAGE,
    message
  };
}

export function clearAuthMessage() {
  return {
    type: AUTHENTICATION_SET_MESSAGE,
    message: null
  };
}

function currentUserLoginFailed(error) {
  return {
    type: AUTHENTICATION_LOGIN_FAILED,
    error
  };
}

export function newAuthForm() {
  return {
    type: AUTHENTICATION_NEW_AUTH
  };
}

function currentUserSignupSuccess() {
  return {
    type: AUTHENTICATION_SIGNUP_SUCCESS
  };
}

function currentUserSignupFailed(error) {
  return {
    type: AUTHENTICATION_SIGNUP_FAILED,
    error
  };
}

function forgotPasswordSuccess() {
  return {
    type: AUTHENTICATION_FORGOT_PASSWORD_SUCCESS
  };
}

function forgotPasswordFailed(error) {
  return {
    type: AUTHENTICATION_FORGOT_PASSWORD_FAILED,
    error
  };
}

function resetPasswordSuccess() {
  return {
    type: AUTHENTICATION_RESET_PASSWORD_SUCCESS
  };
}

function resetPasswordFailed(error) {
  return {
    type: AUTHENTICATION_RESET_PASSWORD_FAILED,
    error
  };
}

function verifyEmailSuccess() {
  return {
    type: AUTHENTICATION_VERIFY_EMAIL_SUCCESS
  };
}

function verifyEmailFailed(error) {
  return {
    type: AUTHENTICATION_VERIFY_EMAIL_FAILED,
    error
  };
}

export function currentUserLoginSuccess(token) {
  Cookies.set("userToken", token);
  return { type: AUTHENTICATION_LOGIN_SUCCESS, payload: token };
}

export function currentUserFetchDataSuccess(userData) {
  return { type: AUTHENTICATION_FETCH_DATA_SUCCESS, payload: userData };
}

export function currentUserLogout() {
  Cookies.expire("userToken");
  return { type: AUTHENTICATION_LOGOUT, payload: {} };
}
