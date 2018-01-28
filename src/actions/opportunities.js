import API from 'util/API';
import { receivedNormalAPIResponse } from 'actions/api';

export const FETCH_OPPORTUNITIES_SUCCESS = 'FETCH_OPPORTUNITIES_SUCCESS';
export const FETCHING_OPPORTUNITIES = 'FETCHING_OPPORTUNITIES';

export function fetchOpportunities(partner, stage, start, end) {
  return (dispatch, getState) => {
    let key = `partner:${partner}:stage:${stage}:start_date:${start}`;
    if(partner) {
      dispatch(fetchingOpportunities(key));
      let url = `opportunities?partner__c=${partner}`;
      url += (stage && `&stage_name=${stage}`) || '';
      url += (start && `&start_date=${start}`) || '';
      url += (end && `&end_date=${end}`) || '';
      return API.get(url)
        .then((res) => dispatch(receivedNormalAPIResponse(res)))
        .then(() => dispatch(fetchOpportunitiesSuccess(key)));
    }
  }
}

export function fetchingOpportunities() {
  return {
    type: FETCHING_OPPORTUNITIES
  };
}

export function fetchOpportunitiesSuccess(key) {
  return {
    type: FETCH_OPPORTUNITIES_SUCCESS,
    key: key
  };
}
