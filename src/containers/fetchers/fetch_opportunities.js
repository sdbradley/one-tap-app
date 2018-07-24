import { createFetcher } from "./create_fetcher";
import { fetchOpportunities } from "actions/opportunities";

export default createFetcher(
  (state, props) =>
    state.opportunities
      .getMeta("fetched")
      .includes(`campaign:${props.campaignId}`) === false,
  props => fetchOpportunities(props.campaignId),
  { showLoader: true }
);
