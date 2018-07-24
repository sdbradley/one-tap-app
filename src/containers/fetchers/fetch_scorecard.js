import { createFetcher } from "./create_fetcher";
import { fetchScorecard } from "actions/scorecard";

export default createFetcher(
  (state, props) =>
    state.scorecard
      .getMeta("fetched")
      .includes(
        `campaign:${props.campaign_id}:start_date:${props.start_date}`
      ) === false,
  props => fetchScorecard(props.campaign_id, props.start_date, props.end_date),
  { showLoader: true }
);
