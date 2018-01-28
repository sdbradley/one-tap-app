import { FETCHING_OPPORTUNITIES, FETCH_OPPORTUNITIES_SUCCESS } from 'actions/opportunities';
import { RECEIVED_NORMAL_API_RESPONSE } from 'actions/api';
import EntityCollection from 'util/EntityCollection';
import { List } from 'immutable';

const INITIAL_STATE = EntityCollection({
  nullEntity: null
}).setMeta('fetched', List());

const opportunities = (list = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_OPPORTUNITIES:
    case FETCH_OPPORTUNITIES_SUCCESS:
      return list.setMeta('fetched', list.getMeta('fetched').push(action.key));
    case RECEIVED_NORMAL_API_RESPONSE:
      if (action.payload && action.payload.opportunities) {
        return list.saveAll(action.payload.opportunities);
      }
      return list;
    default:
      return list;
  }
}

export default opportunities;
