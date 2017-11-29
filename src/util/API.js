import store from 'store';
import { join } from './path';
import { API_LOCATION } from 'constants';

const TRANSFORMERS = {
  'application/json': (response => response.json().catch(() => ({}))),
  'text/plain': (response => response.text())
};

function _authorizationHeader() {
  let state = store.getState();
  let token = state && state.authentication && state.authentication.token;
  return token && `Bearer ${token}`
}

function _getHeaders({ accept = 'application/json' } = {}) {
  return {
    'Content-Type': 'application/json',
    'Accept': accept,
    'Authorization': _authorizationHeader()
  };
}

class API {
  constructor(...segments) {
    this.location = join(segments);
  }

  _resolve(uri) {
    return join(this.location, uri);
  }
  
  _request(method, uri, body, options) {
    let headers = _getHeaders(options);
    return new Promise((resolve, reject) => fetch(
      this._resolve(uri),
      {
        method,
        headers,
        mode: 'cors',
        body: body ? JSON.stringify(body) : undefined
      }
    ).then(
      response => {
        if (response.ok) {
          let transformer = TRANSFORMERS[headers.Accept];
          if (transformer && response.status !== 204) {
            transformer(response).then(resolve).catch(reject);
          } else {
            resolve(response);
          }
        } else {
          reject(response);
        }
      }
    ));
  }

  get(uri, options) {
    return this._request('GET', uri, null, options);
  }

  post(uri, payload, options) {
    return this._request('POST', uri, payload, options);
  }

  delete(uri, options) {
    return this._request('DELETE', uri, null, options);
  }

  put(uri, payload, options) {
    return this._request('PUT', uri, payload, options);
  }

  scope(name, path) {
    if (this[name]) {
      throw new Error(`Tried to create scope that would have overridden API member: ${name}`);
    }

    this[name] = new API(join(this.location, path));
    return this;
  }
}

export const V1 = new API(API_LOCATION, 'v1')

export const V2 = new API(API_LOCATION, 'v2')
  .scope('teacher', 'instructor')
  .scope('student', 'student')
  .scope('Admin', 'admin')
  .scope('public', 'public');

V2.admin = V1;

export default V2;
