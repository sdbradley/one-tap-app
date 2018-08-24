import {
  FETCHING_OPPORTUNITIES,
  FETCH_OPPORTUNITIES_SUCCESS,
  FETCHING_OPPORTUNITY,
  FETCH_OPPORTUNITY_SUCCESS
} from "actions/opportunities";
import { RECEIVED_NORMAL_API_RESPONSE } from "actions/api";
import { LEAVE_FEEDBACK_SUCCESS } from "actions/opportunities";
import EntityCollection from "util/EntityCollection";
import { List } from "immutable";

const INITIAL_STATE = EntityCollection({
  nullEntity: null
}).setMeta("fetched", List());

const opportunities = (list = INITIAL_STATE, action) => {
  let fetched = list.getMeta("fetched");
  switch (action.type) {
    case FETCHING_OPPORTUNITIES:
      return list.setMeta("fetched", fetched.push(action.key)).clear();
    case FETCH_OPPORTUNITIES_SUCCESS:
      return list
        .setMeta("fetched", fetched.push(action.key))
        .clear()
        .saveAll(action.payload.opportunities);
    case FETCHING_OPPORTUNITY:
    case FETCH_OPPORTUNITY_SUCCESS:
      return list.setMeta("fetched", list.getMeta("fetched").push(action.key));
    case LEAVE_FEEDBACK_SUCCESS:
      if (action.data) {
        let o = list.find(action.data.opportunity_id);
        o.feedback.push(action.data);
        return list.save(o);
      }
      return list;
    case RECEIVED_NORMAL_API_RESPONSE:
      if (action.payload && action.payload.opportunities) {
        return list.saveAll(action.payload.opportunities);
      }
      return list;
    default:
      return list;
  }
};

export default opportunities;
