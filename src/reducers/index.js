import {combineReducers} from 'redux';
import authentication from './authentication';
import users from './users';
import roles from './roles';
import modal from './modal';
import navigation from './navigation';
import opportunities from './opportunities';

const appReducer = combineReducers({
  authentication,
  users,
  roles,
  modal,
  navigation,
  opportunities
});

const rootReducer = (state, action) => {
  if (action.type === 'AUTHENTICATION_LOGOUT') {
    clearTimeout(state.authentication.timeout);
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;
