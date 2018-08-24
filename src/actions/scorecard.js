import API from "util/API";
import { receivedNormalAPIResponse } from "actions/api";
export const FETCHING_SCORECARD = "FETCHING_SCORECARD";
export const FETCH_SCORECARD_SUCCESS = "FETCH_SCORECARD_SUCCESS";

export function fetchScorecard(campaign, start, end) {
  return (dispatch, getState) => {
    let key = `campaign:${campaign}`;
    if (campaign) {
      dispatch(fetchingScorecard(key));
      let url = `scorecard?campaign_id=${campaign}`;
      url += (start && `&start_date=${start}`) || "";
      url += (end && `&end_date=${end}`) || "";
      return API.get(url).then(data =>
        dispatch(fetchScorecardSuccess(key, data))
      );
    }
  };
}

export function fetchingScorecard(key) {
  return {
    type: FETCHING_SCORECARD,
    key: key
  };
}

export function fetchScorecardSuccess(key, data) {
  return {
    type: FETCH_SCORECARD_SUCCESS,
    key: key,
    data: data
  };
}
