import { createFetcher } from "./create_fetcher";
import { fetchContacts } from "actions/contacts";

export default createFetcher(
  (state, props) =>
    state.contacts.getMeta("fetched").includes(`account:${props.accountId}`) ===
    false,
  props => fetchContacts(props.accountId),
  { showLoader: true }
);
