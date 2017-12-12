import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from 'store';
import { receiveToken, activity } from 'actions/authentication';
import Routes from 'components/Routes';
import { ROOT_ELEMENT } from 'constants';
import Cookies from "cookies-js";

let token = Cookies.get('userToken');
if (token) {
  store.dispatch(receiveToken(token));
}

window.addEventListener('mousedown', () => store.dispatch(activity()));

ReactDOM.render(
  (
    <Provider store={store}>
      <Routes />
    </Provider>
  ),
  ROOT_ELEMENT
);
