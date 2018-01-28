import API from 'util/API';
import { receivedNormalAPIResponse } from 'actions/api';

export const FETCH_SCORECARD_STATS_SUCCESS = 'FETCH_SCORECARD_STATS_SUCCESS';
export const FETCHING_SCORECARD_STATS = 'FETCHING_SCORECARD_STATS';

export function fetchScorecardStatistics(partner, start, end) {
  return (dispatch, getState) => {
    let key = `partner:${partner}:start_date:${start}`;
    if(partner) {
      dispatch(fetchingScorecardStatistics(key));
      return API.get(`campaign_stats?partner__c=${partner}&start_date=${start}&end_date=${end}`)
        .then((res) => dispatch(receivedNormalAPIResponse(res)))
        .then(() => dispatch(fetchScorecardStatisticsSuccess(key)));
    }
  }
}

export function fetchingStatistics() {
  return {
    type: FETCHING_STATISTICS
  };
}

export function fetchStatisticsSuccess(key) {
  return {
    type: FETCH_STATISTICS_SUCCESS,
    key: key
  };
}
