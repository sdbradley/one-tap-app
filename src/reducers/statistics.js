import { FETCHING_STATISTICS, FETCH_STATISTICS_SUCCESS } from 'actions/statistics';
import { RECEIVED_NORMAL_API_RESPONSE } from 'actions/api';
import EntityCollection from 'util/EntityCollection';
import { List } from 'immutable';

const INITIAL_STATE = EntityCollection().setMeta({
  fetching: List(),
  fetched: List()
});

const statistics = (list = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_STATISTICS:
    case FETCH_STATISTICS_SUCCESS:
      return list.setMeta('fetched', list.getMeta('fetched').push(action.key));
    case RECEIVED_NORMAL_API_RESPONSE:
      if (action.payload && action.payload.statistics) {
        return list.saveAll(action.payload.statistics);
      }
      return list;
    default:
      return list;
  }
}

export default statistics;
