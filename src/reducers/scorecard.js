import { FETCHING_SCORECARD, FETCH_SCORECARD_SUCCESS } from 'actions/scorecard';
import { RECEIVED_NORMAL_API_RESPONSE } from 'actions/api';
import EntityCollection from 'util/EntityCollection';
import { List } from 'immutable';

const INITIAL_STATE = EntityCollection({
  nullEntity: null
}).setMeta('fetched', List());

const scorecard = (list = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_SCORECARD:
    case FETCH_SCORECARD_SUCCESS:
      return list.setMeta('fetched', list.getMeta('fetched').push(action.key));
    case RECEIVED_NORMAL_API_RESPONSE:
      if (action.payload && action.payload.scorecard) {
        return list.saveAll(action.payload.scorecard);
      }
      return list;
    default:
      return list;
  }
}

export default scorecard;
