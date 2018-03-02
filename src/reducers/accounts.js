import { FETCHING_ACCOUNT, FETCH_ACCOUNT_SUCCESS, FETCHING_ACCOUNTS, FETCH_ACCOUNTS_SUCCESS } from 'actions/accounts';
import { RECEIVED_NORMAL_API_RESPONSE } from 'actions/api';
import EntityCollection from 'util/EntityCollection';
import { List } from 'immutable';

const INITIAL_STATE = EntityCollection().setMeta({
  fetching: List(),
  fetched: List()
});

const accounts = (list = INITIAL_STATE, action) => {
  let fetched = list.getMeta('fetched');
  switch (action.type) {
    case FETCHING_ACCOUNT:
    case FETCH_ACCOUNT_SUCCESS:
      return list.setMeta('fetched', list.getMeta('fetched').push(action.key));
    case FETCHING_ACCOUNTS:
    case FETCH_ACCOUNTS_SUCCESS:
      return list.setMeta('fetched', fetched.push('*'));
    case RECEIVED_NORMAL_API_RESPONSE:
      if (action.payload && action.payload.accounts) {
        return list.saveAll(action.payload.accounts);
      }
      return list;
    default:
      return list;
  }
}

export default accounts;
