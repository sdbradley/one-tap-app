import { createFetcher } from "./create_fetcher";
import { fetchAccountOpportunities } from "actions/opportunities";

export default createFetcher(
  (state, props) =>
    state.opportunities
      .getMeta("fetched")
      .includes(`accountId:${props.accountId}`) === false,
  props => fetchAccountOpportunities(props.accountId),
  { showLoader: true }
);
