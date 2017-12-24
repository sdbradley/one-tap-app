import API from 'util/API';
import { receivedNormalAPIResponse } from 'actions/api';

export const FETCH_STATISTICS_SUCCESS = 'FETCH_STATISTICS_SUCCESS';
export const FETCHING_STATISTICS = 'FETCHING_STATISTICS';

export function fetchStatistics(partner, start, end) {
  return (dispatch, getState) => {
    let key = `partner:${partner}:start_date:${start}`;
    if(partner) {
      dispatch(fetchingStatistics(key));
      return API.get(`statistics?partner__c=${partner}&start_date=${start}&end_date=${end}`)
        .then((res) => dispatch(receivedNormalAPIResponse(res)))
        .then(() => dispatch(fetchStatisticsSuccess(key)));
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
