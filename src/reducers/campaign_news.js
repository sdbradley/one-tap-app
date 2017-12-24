import { FETCHING_CAMPAIGN_NEWS, FETCH_CAMPAIGN_NEWS_SUCCESS } from 'actions/campaigns';
import { RECEIVED_NORMAL_API_RESPONSE } from 'actions/api';
import EntityCollection from 'util/EntityCollection';
import { List } from 'immutable';

const INITIAL_STATE = EntityCollection().setMeta({
  fetching: List(),
  fetched: List()
});

const campaign_news = (list = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_CAMPAIGN_NEWS:
    case FETCH_CAMPAIGN_NEWS_SUCCESS:
      return list.setMeta('fetched', list.getMeta('fetched').push(action.key));
    case RECEIVED_NORMAL_API_RESPONSE:
      if (action.payload && action.payload.campaign_news) {
        return list.saveAll(action.payload.campaign_news);
      }
      return list;
    default:
      return list;
  }
}

export default campaign_news;
