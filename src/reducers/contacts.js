import { FETCHING_CONTACTS, FETCH_CONTACTS_SUCCESS } from "actions/contacts";
import { RECEIVED_NORMAL_API_RESPONSE } from "actions/api";
import EntityCollection from "util/EntityCollection";
import { List } from "immutable";

const INITIAL_STATE = EntityCollection({
  nullEntity: null
}).setMeta("fetched", List());

const contacts = (list = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_CONTACTS:
    case FETCH_CONTACTS_SUCCESS:
      return list.setMeta("fetched", list.getMeta("fetched").push(action.key));
    case RECEIVED_NORMAL_API_RESPONSE:
      if (action.payload && action.payload.contacts) {
        return list.saveAll(action.payload.contacts);
      }
      return list;
    default:
      return list;
  }
};

export default contacts;
