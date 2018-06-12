import { FETCHING_CAMPAIGN, FETCH_CAMPAIGN_SUCCESS, FETCHING_CAMPAIGNS, FETCH_CAMPAIGNS_SUCCESS, FETCHING_OPPORTUNITY, FETCH_OPPORTUNITY_SUCCESS } from 'actions/campaigns';
import { RECEIVED_NORMAL_API_RESPONSE } from 'actions/api';
import EntityCollection from 'util/EntityCollection';
import { List } from 'immutable';

const INITIAL_STATE = EntityCollection({
  nullEntity: null
}).setMeta('fetched', List());

const campaigns = (list = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_CAMPAIGN:
    case FETCH_CAMPAIGN_SUCCESS:
      return list.setMeta('fetched', list.getMeta('fetched').push(action.key));
    case FETCHING_CAMPAIGNS:
    case FETCH_CAMPAIGNS_SUCCESS:
      return list.setMeta('fetched', list.getMeta('fetched').push(action.key));
    case RECEIVED_NORMAL_API_RESPONSE:
      if (action.payload && action.payload.campaigns) {
        return list.saveAll(action.payload.campaigns);
      }
      return list;
    default:
      return list;
  }
}

export default campaigns;
