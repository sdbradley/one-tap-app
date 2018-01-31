import API from 'util/API';
import { receivedNormalAPIResponse } from 'actions/api';
export const FETCHING_SCORECARD = 'FETCHING_SCORECARD';
export const FETCH_SCORECARD_SUCCESS = 'FETCH_SCORECARD_SUCCESS';

export function fetchScorecard(partner, start, end) {
  return (dispatch, getState) => {
    let key = `partner:${partner}:start_date:${start}`;
    if(partner) {
      dispatch(fetchingScorecard(key));
      let url = `scorecard?partner__c=${partner}`;
      url += (start && `&start_date=${start}`) || '';
      url += (end && `&end_date=${end}`) || '';
      return API.get(url)
        .then((res) => dispatch(receivedNormalAPIResponse(res)))
        .then(() => dispatch(fetchScorecardSuccess(key)));
    }
  }
}

export function fetchingScorecard() {
  return {
    type: FETCHING_SCORECARD
  };
}

export function fetchScorecardSuccess(key) {
  return {
    type: FETCH_SCORECARD_SUCCESS,
    key: key
  };
}
